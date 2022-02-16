package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = ""
const dbName = "iFun"
const colName = "users"

var collection *mongo.Collection

func init() {
	clientOption := options.Client().ApplyURI(connectionString)
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Print("MongoDB connection sucess")

	collection = (*mongo.Collection)(client.Database(dbName).Collection(colName))
}
