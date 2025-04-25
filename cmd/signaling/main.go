package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/TaiTitans/GoStreamChain/internal/signaling"
)

func main() {
	// Khởi tạo Hub để quản lý các phòng và client
	hub := signaling.NewHub()

	// Khởi tạo Server với Hub
	server := signaling.NewServer(hub)

	// Định nghĩa endpoint cho WebSocket
	http.HandleFunc("/ws", server.HandleWebSocket)

	// Khởi chạy server HTTP trên port 8080
	fmt.Println("Signaling Server running on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
