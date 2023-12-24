package routes

import (
	"github.com/gin-gonic/gin"
	"wisnuprsj.com/study/rest-api/middleware"
)

func RegisterRoutes(server *gin.Engine) {
	server.GET("/events", GetEvents) // GET, POST, PUT, PATCH, DELETE
	server.GET("/events/:id", GetEventById)

	authenticated := server.Group("/")
	authenticated.Use(middleware.Authenticate)
	authenticated.POST("/events", CreateEvent)
	authenticated.PUT("/events/:id", UpdateEvent)
	authenticated.DELETE("/events/:id", DeleteEventById)

	// server.POST("/events", middleware.Authenticate, CreateEvent)
	// server.PUT("/events/:id", UpdateEvent)
	// server.DELETE("/events/:id", DeleteEventById)

	server.POST("/signup", Signup)
	server.POST("/login", Login)
}