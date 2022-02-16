package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	router.GET("/", func(context *gin.Context) {
		context.String(http.StatusOK, "Hello World")

	})

	router.Run(":" + port)
}
