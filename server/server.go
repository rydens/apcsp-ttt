package main

import (
	//"encoding/json"
	"fmt"
	//"github.com/gorilla/websocket"
	"io/ioutil"
	"net/http"
	"os"
	//"time"
)

func main() {
	indexFile, err := os.Open("html/index.html")
	if err != nil {
		fmt.Println(err)
	}
	index, err := ioutil.ReadAll(indexFile)
	if err != nil {
		fmt.Println(err)
	}
	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) {
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, string(index))
	})
	http.ListenAndServe(":3000", nil)
}
