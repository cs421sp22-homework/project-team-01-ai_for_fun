package controller

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/helper"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var hisCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "uploadrecord")

type HisRequest struct {
	ID      string `json:"_id"`
	User_id string `json:"user_id"`
}

func Deletehis() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var his HisRequest

		err := c.BindJSON(&his)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json"})
			return
		}

		oid, _ := primitive.ObjectIDFromHex(his.ID)
		deleteResult, err := hisCollection.DeleteOne(ctx, bson.M{"user_id": his.User_id, "_id": oid})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to delete the history on mongodb"})
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

func Gethis() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		fmt.Println(userId)
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "user_id", Value: userId}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "s3_id", Value: -1}}}}
		result, err := hisCollection.Aggregate(ctx, mongo.Pipeline{matchStage, sortStage})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while finding history"})
			return
		}
		var allHis []bson.M
		err = result.All(ctx, &allHis)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while binding results"})
			return

		}
		if allHis == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No work match the given user_id"})
			return
		}

		allHis, err = helper.Updatework(allHis)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while updating url"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allHis)

	}
}
