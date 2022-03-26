package main

import (
	"log"
	"net/http"
	"os"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/route"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(cors.Default())
	router.GET("/", func(context *gin.Context) {
		context.String(http.StatusOK, "Hello World")
	})
	route.EntityRoutes(router)
	route.AuthRoutes(router)
	route.UserRoutes(router)

	router.Run(":" + port)
}
