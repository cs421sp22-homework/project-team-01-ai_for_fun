package controller

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

var imageCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "image")

func UploadImage() gin.HandlerFunc {
	return func(c *gin.Context) {
		file, header, err := c.Request.FormFile("upload")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to get the file"})
			return
		}
		filename := header.Filename
		fmt.Println(file, err, filename)

		out, err := os.Create(filename)
		if err != nil {
			log.Fatal(err)
		}
		defer out.Close()

		_, err = io.Copy(out, file)
		if err != nil {
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, gin.H{"response": "upload success"})
	}
}
