package controller

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/model"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var postCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "post")

func Getpost() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "post_time", Value: -1}}}}
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
		matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "user_id", Value: userId}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "post_time", Value: -1}}}}
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

func Createpost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var post model.Post

		err := c.BindJSON(&post)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post variable"})
			return
		}
		post.ID = primitive.NewObjectID()
		post.Post_id = post.ID.Hex()
		post.Liked_time = 0
		post.Post_time = time.Now()
		post.Comment = []bson.M{}

		resultInsertionNumber, insertErr := postCollection.InsertOne(ctx, post)
		if insertErr != nil {
			msg := fmt.Sprintf("User item was not created")
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}
		defer cancel()
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, resultInsertionNumber)

	}
}

func Deletepost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var post model.Post

		err := c.BindJSON(&post)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post_id"})
			return
		}
		deleteResult, err := postCollection.DeleteOne(ctx, bson.M{"user_id": post.User_id, "post_id": post.Post_id})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to delete the post on mongodb"})
			return
		}
		if deleteResult.DeletedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "post_id or user_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, "Delete Success")

	}
}

func Likepost() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var post model.Post

		err := c.BindJSON(&post)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post_id"})
			return
		}
		filter := bson.M{"post_id": post.Post_id}
		update_op := bson.D{
			{Key: "$inc", Value: bson.D{
				{Key: "liked_time", Value: 1},
			}},
		}
		updateResult, err := postCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the post liked_time on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "post_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, "Like Post Success")

	}
}
