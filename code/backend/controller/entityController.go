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

var entityCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "entity")

func GetEntities() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{}}}}
		groupStage := bson.D{{Key: "$group", Value: bson.D{
			{Key: "_id", Value: bson.D{{Key: "mode", Value: "$mode"}, {Key: "topic", Value: "$topic"}}},
			{Key: "entities", Value: bson.D{{Key: "$push", Value: "$$ROOT"}}}}}}
		sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "_id", Value: 1}}}}
		result, err := entityCollection.Aggregate(ctx, mongo.Pipeline{matchStage, groupStage, sortStage})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while listing entity"})
		}

		// projectStage := bson.D{
		// 	{Key: "$project", Value: bson.D{
		// 	{Key: "_id", Value: 0},
		// 	{Key: "total_count", Value: 1},
		// 	{Key: "user_items", Value: bson.D{{Key: "$slice", Value: []interface{}{"$data", startIndex, recordPerPage}}}}}}}

		var allEntity []bson.M
		err = result.All(ctx, &allEntity)
		if err != nil {
			log.Fatal(err)
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allEntity)

	}
}
