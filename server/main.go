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
		A	int	`json:"A"`
		B	int	`json:"B"`
		C	int	`json:"C"`
		D	int	`json:"D"`
		E	int	`json:"E"`
		F	int	`json:"F"`
		G	int	`json:"G"`
		H	int	`json:"H"`
		I	int	`json:"I"`
	}
	var board []Square
	router := mux.NewRouter()
	func GetBoard(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(people)
	}
	router.HandleFunc("/board", GetBoard).Methods("GET")
	log.Fatal(http.ListenAndServe(":8000", router))
}

