package controller

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/model"
)




func Createcomment() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var comm model.Comment
		err := c.BindJSON(&comm)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post variable"})
			return
		}
		nid := primitive.NewObjectID()
		comm.Comment_id = nid.Hex()
		comm.Reply= []bson.M{}
		filter := bson.M{"post_id": comm.Post_id}
		update_op := bson.M{
			"$push": bson.M{"comment":comm},
		}
		updateResult, err := postCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the comment on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "post_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, "comment Success")

	}
}

func Createreply() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var rep model.Reply
		err := c.BindJSON(&rep)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the sent json to post variable"})
			return
		}
		fmt.Println(rep.Post_id)
		fmt.Println(rep.Comment_id)
		filter := bson.M{"post_id": rep.Post_id, "comment": bson.M{"$elemMatch": bson.M{"comment_id":rep.Comment_id} }}
		update_op := bson.M{
			"$push": bson.M{"comment.$.reply":rep},
		}
		updateResult, err := postCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the reply on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "post_id or comment_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		//c.Header("Access-Control-Allow-Credentials", "true")
		c.JSON(http.StatusOK, "reply Success")

	}
}
