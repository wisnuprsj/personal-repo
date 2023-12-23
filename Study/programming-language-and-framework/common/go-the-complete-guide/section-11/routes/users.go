package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"wisnuprsj.com/study/rest-api/models"
)

func Signup(context *gin.Context) {
	var user models.User
	err:= context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	err = user.Save()

	context.JSON(http.StatusCreated, gin.H{"message": "Success", "status": "Ok"})	
}