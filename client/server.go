package main

import (
	"bufio"
	"fmt"
	"net"
)

var message1 string

func main() {
	fmt.Println("Launching server...")

	ln, _ := net.Listen("tcp", ":8080")

	conn, _ := ln.Accept()

	for message1 == "" {
		message, _ := bufio.NewReader(conn).ReadString('\n')
		message1 = message
	}
	fmt.Print("Message: ", string(message1), "\n")
	conn.Write([]byte("Hello there mr client sir" + "\n"))
}
