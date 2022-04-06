package model
import (
	"go.mongodb.org/mongo-driver/bson"
)
type Comment struct {
	Post_id     string             `json:"postid"`
	Comment_id  string             `json:"commentid"`
	Comment_content   string       `json:"commentcontent"`
	Reply       []bson.M           `json:"reply"`
	User_avater string             `json:"useravater"`
	User_id     string             `json:"userid"`
	User_name   string             `json:"username"`
}