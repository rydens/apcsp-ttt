package main

import (
	"fmt"
	"html"
	"log"
	"net/http"
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
func create_board() {
	type Board struct {
		1	int	`json:"1"`
		2	int	`json:"2"`
		3	int	`json:"3"`
		4	int	`json:"4"`
		5	int	`json:"5"`
		6	int	`json:"6"`
		7	int	`json:"7"`
		8	int	`json:"8"`
		9	int	`json:"9"`
	}
	
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))

}
