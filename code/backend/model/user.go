package model

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID            primitive.ObjectID `bson:"_id"`
	User_id       string             `json:"user_id"`
	User_type     string             `json:"user_type" validate:"required,eq=ADMIN|eq=USER"`
	Name          string             `json:"name"`
	Email         string             `json:"email"`
	Password      string             `json:"password"`
	Token         string             `json:"token"`
	Refresh_token string             `json:"refresh_token"`
	Avatar        string             `json:"avatar"`
}
