package signaling

type Message struct {
	Type    string `json:"type"`
	RoomID  string `json:"roomId"`
	Sender  string `json:"sender"`
	Payload string `json:"payload"`
}

type Client struct {
	ID   string
	Send chan Message
}

type Room struct {
	ID      string
	Clients map[string]*Client
}
