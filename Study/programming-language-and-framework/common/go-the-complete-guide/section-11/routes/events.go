package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"wisnuprsj.com/study/rest-api/models"
)

func GetEvents(context *gin.Context) {
	events, err := models.GetAllEvents()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't get data", "status": "failed", "error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"message": "Success", "status": "Ok", "data": events})
}

func GetEventById(context *gin.Context) {
	id, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	event, err := models.GetEventById(id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't get data", "status": "failed", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Success", "status": "Ok", "data": event})

}

func CreateEvent(context *gin.Context) {
	var event models.Event
	err := context.ShouldBindJSON(&event)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	event.ID = 1
	event.UserID = 1

	event.Save()
	context.JSON(http.StatusCreated, gin.H{"message": "Success", "status": "Ok"})
}

func UpdateEvent(context *gin.Context) {
	id, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	_, err = models.GetEventById(id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't get data", "status": "failed", "error": err.Error()})
		return
	}

	var updatedEvent models.Event 
	err = context.ShouldBindJSON(&updatedEvent)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	updatedEvent.ID = id
	err = updatedEvent.Update()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't update event", "status": "failed", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Update successfully", "status": "Ok"})
}

func DeleteEventById(context *gin.Context) {
	id, err := strconv.ParseInt(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	event, err := models.GetEventById(id)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't get data", "status": "failed", "error": err.Error()})
		return
	}

	err = event.Delete()

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't delete event", "status": "failed", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Delete successfully", "status": "Ok"})
}