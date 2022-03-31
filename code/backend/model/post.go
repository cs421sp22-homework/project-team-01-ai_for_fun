package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Post struct {
	ID          primitive.ObjectID `bson:"_id"`
	Post_id     string             `json:"post_id"`
	Post_text   string             `json:"post_text"`
	Post_time   time.Time          `json:"post_time"`
	Liked_time  int64              `json:"liked_time"`
	Comment     []bson.M           `json:"comment"`
	Content_url string             `json:"content_url"`
	User_avater string             `json:"user_avater"`
	User_id     string             `json:"user_id"`
	User_name   string             `json:"user_name"`
}
