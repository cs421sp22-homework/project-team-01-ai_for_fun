package controller

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var postCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "post")

func Getpost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "posttime", Value: -1}}}}
		limitStage := bson.D{{Key: "$limit", Value: 30}}
		result, err := postCollection.Aggregate(ctx, mongo.Pipeline{matchStage, sortStage, limitStage})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while listing post"})
		}

		var allPost []bson.M
		err = result.All(ctx, &allPost)
		if err != nil {
			log.Fatal(err)
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allPost)
	}
}

func Getuserpost() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "userid", Value: userId}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "posttime", Value: -1}}}}
		result, err := postCollection.Aggregate(ctx, mongo.Pipeline{matchStage, sortStage})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while finding post"})
		}
		var allPost []bson.M
		err = result.All(ctx, &allPost)
		if err != nil {
			log.Fatal(err)
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allPost)

	}
}
