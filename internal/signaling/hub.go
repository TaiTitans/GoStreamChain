package signaling

import "sync"

type Hub struct {
	Rooms map[string]*Room
	Lock  sync.RWMutex
}

func NewHub() *Hub {
	return &Hub{
		Rooms: make(map[string]*Room),
	}
}

func (h *Hub) JoinRoom(roomID, clientID string, client *Client) {
	h.Lock.Lock()
	defer h.Lock.Unlock()

	if _, exists := h.Rooms[roomID]; !exists {
		h.Rooms[roomID] = &Room{
			Clients: make(map[string]*Client),
		}
	}
	h.Rooms[roomID].Clients[clientID] = client

	// Gửi thông báo join thành công về client
	client.Send <- Message{
		Type:   "joined",
		RoomID: roomID,
	}
}
func (h *Hub) LeaveRoom(roomID string, clientID string) {
	h.Lock.Lock()
	defer h.Lock.Unlock()

	room, ok := h.Rooms[roomID]
	if !ok {
		return
	}

	delete(room.Clients, clientID)

	// Xoá room nếu không còn ai
	if len(room.Clients) == 0 {
		delete(h.Rooms, roomID)
	}
}

func (h *Hub) Broadcast(roomID, senderID string, msg Message) {
	h.Lock.RLock()
	defer h.Lock.RUnlock()

	if room, ok := h.Rooms[roomID]; ok {
		for id, c := range room.Clients {
			if id != senderID {
				c.Send <- msg
			}
		}
	}
}
