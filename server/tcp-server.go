package main

import "net"
import "fmt"

import "bufio"

//import "strings" // only needed below for sample processing

//https://systembash.com/a-simple-go-tcp-server-and-tcp-client/
func main() {
	type Board struct {
		One   int
		Two   int
		Three int
		Four  int
		Five  int
		Six   int
		Seven int
		Eight int
		Nine  int
	}
	for {
		fmt.Println("Launching server...")

		ln, _ := net.Listen("tcp", ":8080")

		conn, _ := ln.Accept()

		message, _ := bufio.NewReader(conn).ReadString('\n')
		//	fmt.Print("Message Received:", string(message))
		//	newmessage := strings.ToUpper(message)
		conn.Write([]byte(message + "\n"))
	}

}
