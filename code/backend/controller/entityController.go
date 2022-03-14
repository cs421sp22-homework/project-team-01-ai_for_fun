package controller

import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

var entityCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "entity")

func GetEntities() gin.HandlerFunc {
	return func(c *gin.Context) {
		// ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		// defer cancel()

	}
}
