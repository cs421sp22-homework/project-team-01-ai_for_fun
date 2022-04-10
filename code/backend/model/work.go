package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Work struct {
	ID      primitive.ObjectID `bson:"_id"`
	User_id string             `json:"user_id"`
	S3_id   string             `json:"s3_id"`
	Url     string             `json:"url"`
	Type    string             `json:"type"`
}
