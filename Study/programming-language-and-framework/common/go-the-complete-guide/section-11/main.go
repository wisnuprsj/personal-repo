package main

import (
	"github.com/gin-gonic/gin"
	"wisnuprsj.com/study/rest-api/db"
	"wisnuprsj.com/study/rest-api/routes"
)

func main() {
	db.InitDB()
	server := gin.Default()

	routes.RegisterRoutes(server)

	server.Run(":8080") // localhost:8080
}

