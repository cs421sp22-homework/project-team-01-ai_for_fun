package controller

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/helper"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/model"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var workCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "workrecord")

func Deletework() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var work model.Work

		err := c.BindJSON(&work)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post_id"})
			return
		}
		deleteResult, err := workCollection.DeleteOne(ctx, bson.M{"user_id": work.User_id, "_id": work.ID})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to delete the post on mongodb"})
			return
		}
		if deleteResult.DeletedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "_id or user_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, "Delete Success")
	}
}

func Getwork() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		fmt.Println(userId)
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "user_id", Value: userId}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "type", Value: -1}}}}
		result, err := workCollection.Aggregate(ctx, mongo.Pipeline{matchStage, sortStage})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while finding work"})
			return
		}
		var allWork []bson.M
		err = result.All(ctx, &allWork)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while binding results"})
			return

		}
		allWork, err = helper.Updatework(allWork)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while updating url"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allWork)

	}
}
