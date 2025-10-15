package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Email string `json:"email"`
}

func getUserHandler(w http.ResponseWriter, r *http.Request) {
    user := User{
        ID:   1,
        Name: "Alice",
        Email: "alice@example.com",
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func main() {
    http.HandleFunc("/user", getUserHandler)
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}