package main

import (
	"encoding/json"
	//"fmt"
	//"html"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

func get_json(url string, target interface{}) error {
	var myClient = &http.Client{Timeout: 10 * time.Second}
	r, err := myClient.Get(url)
	if err != nil {
		return err
	}
	defer r.Body.Close()
	return json.NewDecoder(r.Body).Decode(target)
}

func main() {
	type Square struct {
		Id	int	`json:"id"`
		State	int	`json:"state"`
	}
	var board []Square
	router := mux.NewRouter()
	func GetBoard(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(people)
	}
	router.HandleFunc("/board", GetBoard).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

