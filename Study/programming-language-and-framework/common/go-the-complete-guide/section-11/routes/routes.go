package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	server.GET("/events", GetEvents) // GET, POST, PUT, PATCH, DELETE
	server.GET("/events/:id", GetEventById)
	server.POST("/events", CreateEvent)
	server.PUT("/events/:id", UpdateEvent)
	server.DELETE("/events/:id", DeleteEventById)
	server.POST("/signup", Signup)
}