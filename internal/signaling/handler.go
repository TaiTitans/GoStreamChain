package signaling

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

func UpgradeConnection(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	return upgrader.Upgrade(w, r, nil)
}

func ServeWebSocket(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}

	clientID := r.URL.Query().Get("clientId")
	roomID := r.URL.Query().Get("roomId")
	if clientID == "" || roomID == "" {
		log.Println("Missing clientId or roomId")
		conn.Close()
		return
	}

	client := &Client{
		ID:   clientID,
		Send: make(chan Message, 256),
	}

	hub.JoinRoom(roomID, clientID, client)

	go writePump(conn, client)
	readPump(conn, hub, client, roomID)
	hub.LeaveRoom(roomID, clientID)
	conn.Close()
}

func (s *Server) readPump(conn *websocket.Conn, client *Client) {
	defer func() {
		// Xóa client khỏi room khi kết nối đóng
		s.Hub.Lock.Lock()
		for roomID, room := range s.Hub.Rooms {
			if _, exists := room.Clients[client.ID]; exists {
				delete(room.Clients, client.ID)
				if len(room.Clients) == 0 {
					delete(s.Hub.Rooms, roomID) // Xóa room nếu không còn client
				}
				break
			}
		}
		s.Hub.Lock.Unlock()
		conn.Close()
	}()

	for {
		var msg Message
		if err := conn.ReadJSON(&msg); err != nil {
			log.Println("Read error:", err)
			break
		}

		switch msg.Type {
		case "join":
			s.Hub.JoinRoom(msg.RoomID, client.ID, client)
		case "offer", "answer", "candidate":
			s.Hub.BroadcastToRoom(msg.RoomID, client.ID, msg)
		default:
			log.Println("Unknown message type:", msg.Type)
		}
	}
}

func writePump(conn *websocket.Conn, client *Client) {
	for msg := range client.Send {
		if err := conn.WriteJSON(msg); err != nil {
			log.Println("write error:", err)
			break
		}
	}
}

func readPump(conn *websocket.Conn, hub *Hub, client *Client, roomID string) {
	defer func() {
		hub.LeaveRoom(roomID, client.ID)
		conn.Close()
	}()

	for {
		var msg Message
		if err := conn.ReadJSON(&msg); err != nil {
			log.Println("Read error:", err)
			break
		}

		switch msg.Type {
		case "offer", "answer", "candidate":
			hub.BroadcastToRoom(roomID, client.ID, msg)
		default:
			log.Println("Unknown message type:", msg.Type)
		}
	}
}
