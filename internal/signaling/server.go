package signaling

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Server struct {
	Hub *Hub
}

func NewServer(hub *Hub) *Server {
	return &Server{
		Hub: hub,
	}
}

func (s *Server) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}

	clientID := r.URL.Query().Get("clientId")
	if clientID == "" {
		log.Println("Missing clientId")
		conn.Close()
		return
	}
	log.Printf("WebSocket connection established for client: %s", clientID)
	client := &Client{
		ID:   clientID,
		Send: make(chan Message),
	}

	go s.readPumpServer(conn, client)
	go s.writePump(conn, client)
}

func (s *Server) readPumpServer(conn *websocket.Conn, client *Client) {
	defer conn.Close()

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

func (s *Server) writePump(conn *websocket.Conn, client *Client) {
	defer conn.Close()

	for msg := range client.Send {
		if err := conn.WriteJSON(msg); err != nil {
			log.Println("Write error:", err)
			break
		}
	}
}

func (h *Hub) BroadcastToRoom(roomID string, senderID string, msg Message) {
	h.Lock.RLock()
	defer h.Lock.RUnlock()

	room, ok := h.Rooms[roomID]
	if !ok {
		return
	}

	for id, client := range room.Clients {
		if id != senderID {
			select {
			case client.Send <- msg:
			default:
				// channel full hoặc không gửi được
				close(client.Send)
				delete(room.Clients, id)
			}
		}
	}
}
