package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"wisnuprsj.com/study/rest-api/models"
	"wisnuprsj.com/study/rest-api/utils"
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

func Login(context *gin.Context) {
	var user models.User

	err := context.ShouldBindJSON(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "status": "failed", "error": err.Error()})
		return
	}

	err = user.ValidateCredentials()

	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid Credentials", "status": "failed", "error": err.Error()})
		return
	}

	token, err := utils.GenerateToken(user.Email, user.ID)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Error generate token", "status": "failed", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Success", "status": "Ok", "token": token})
}