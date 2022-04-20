package controller

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/database"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/helper"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/model"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "iFun", "user")
var validate = validator.New()

type ChangeInfo struct {
	New_name     string `json:"new_name"`
	New_Avatar   string `json:"new_avatar"`
	Old_password string `json:"old_password"`
	New_password string `json:"new_password"`
}

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := "success"

	if err != nil {
		msg = fmt.Sprintf("email or password is incorrect")
		check = false
	}
	return check, msg
}

func Register() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user model.User

		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error() + " fail to bind the json"})
			return
		}

		validationErr := validate.Struct(user)
		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validationErr.Error() + " validation error"})
			return
		}
		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		defer cancel()
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while checking for the email"})
		}

		password := HashPassword(user.Password)
		user.Password = password

		if count > 0 {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "this email has already been used"})
			return
		}
		user.ID = primitive.NewObjectID()
		user.User_id = user.ID.Hex()
		token, refreshToken, _ := helper.GenerateAllTokens(user.Email, user.Name, user.User_type, user.User_id)
		user.Token = token
		user.Refresh_token = refreshToken
		user.Avatar = ""
		user.Followed_List = []string{}
		user.Follower_List = []string{}

		resultInsertionNumber, insertErr := userCollection.InsertOne(ctx, user)
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

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user model.User
		var foundUser model.User

		err := c.BindJSON(&user)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err = userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "email or password is incorrect"})
			return
		}

		passwordIsValid, msg := VerifyPassword(user.Password, foundUser.Password)
		defer cancel()
		if passwordIsValid != true {
			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}

		token, refreshToken, _ := helper.GenerateAllTokens(foundUser.Email, foundUser.Name, foundUser.User_type, foundUser.User_id)
		helper.UpdateAllTokens(token, refreshToken, foundUser.User_id)
		err = userCollection.FindOne(ctx, bson.M{"user_id": foundUser.User_id}).Decode(&foundUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		foundUser.Avatar, err = helper.UpdateUrl(foundUser.Avatar)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while updating url"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, foundUser)
	}
}

func UserBasicInfo() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user model.User
		err := userCollection.FindOne(ctx, bson.M{"user_id": userId}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, user)
	}
}

func GetUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := helper.CheckUserType(c, "ADMIN")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		recordPerPage, err := strconv.Atoi(c.Query("recordPerPage"))
		if err != nil || recordPerPage < 1 {
			recordPerPage = 10

		}
		page, err := strconv.Atoi(c.Query("page"))
		if err != nil || page < 1 {
			page = 1
		}

		startIndex := (page - 1) * recordPerPage
		startIndex, err = strconv.Atoi(c.Query("startIndex"))

		matchStage := bson.D{{Key: "$match", Value: bson.D{{}}}}
		groupStage := bson.D{{Key: "$group", Value: bson.D{
			{Key: "_id", Value: bson.D{{Key: "_id", Value: "null"}}},
			{Key: "total_count", Value: bson.D{{Key: "$sum", Value: 1}}},
			{Key: "data", Value: bson.D{{Key: "$push", Value: "$$ROOT"}}}}}}
		projectStage := bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "_id", Value: 0},
				{Key: "total_count", Value: 1},
				{Key: "user_items", Value: bson.D{{Key: "$slice", Value: []interface{}{"$data", startIndex, recordPerPage}}}}}}}
		result, err := userCollection.Aggregate(ctx, mongo.Pipeline{matchStage, groupStage, projectStage})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while listing user items"})
		}
		var allusers []bson.M
		err = result.All(ctx, &allusers)
		if err != nil {
			log.Fatal(err)
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, allusers[0])
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		err := helper.MatchUserTypeToUid(c, userId)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user model.User
		err = userCollection.FindOne(ctx, bson.M{"user_id": userId}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, user)
	}
}

func ChangeUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		var changeinfo ChangeInfo
		var foundUser model.User
		var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		err := c.BindJSON(&changeinfo)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err = userCollection.FindOne(ctx, bson.M{"user_id": userId}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "user_id is incorrect"})
			return
		}
		if changeinfo.New_name != "" {
			foundUser.Name = changeinfo.New_name
		}
		if changeinfo.New_Avatar != "" {
			foundUser.Avatar = changeinfo.New_Avatar
		}
		if changeinfo.New_password != "" && changeinfo.Old_password != "" {
			passwordIsValid, msg := VerifyPassword(changeinfo.Old_password, foundUser.Password)
			if passwordIsValid != true {
				c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
				return
			}
			foundUser.Password = HashPassword(changeinfo.New_password)
		}
		_, err = userCollection.UpdateOne(ctx, bson.M{"user_id": userId}, bson.D{
			{Key: "$set", Value: bson.D{
				{Key: "name", Value: foundUser.Name},
				{Key: "avatar", Value: foundUser.Avatar},
				{Key: "password", Value: foundUser.Password}}}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occur when update mongodb"})
			return
		}
		foundUser.Avatar, err = helper.UpdateUrl("public/" + foundUser.Avatar)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occur when update avatar url"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, foundUser)
	}
}

func Follow() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var followInfo model.FollowInfo

		err := c.BindJSON(&followInfo)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		filter := bson.M{"user_id": followInfo.Followed_Id}
		update_op := bson.M{
			"$push": bson.M{"follower_list": followInfo.Follower_Id},
		}
		updateResult, err := userCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the follower list of followed user on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "followed_id doesn't match with any record on database"})
			return
		}
		filter = bson.M{"user_id": followInfo.Follower_Id}
		update_op = bson.M{
			"$push": bson.M{"followed_list": followInfo.Followed_Id},
		}
		updateResult, err = userCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the followed list of follower user on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "follower_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, "Follow Success")
	}
}

func UnFollow() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var followInfo model.FollowInfo

		err := c.BindJSON(&followInfo)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		filter := bson.M{"user_id": followInfo.Followed_Id}
		update_op := bson.M{
			"$pull": bson.M{"follower_list": followInfo.Follower_Id},
		}
		updateResult, err := userCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the follower list of followed user on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "followed_id doesn't match with any record on database"})
			return
		}
		filter = bson.M{"user_id": followInfo.Follower_Id}
		update_op = bson.M{
			"$pull": bson.M{"followed_list": followInfo.Followed_Id},
		}
		updateResult, err = userCollection.UpdateOne(ctx, filter, update_op)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error() + " fail to update the followed list of follower user on mongodb"})
			return
		}
		if updateResult.MatchedCount == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "follower_id doesn't match with any record on database"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, "UnFollow Success")

	}
}

func IsFollowed() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var followInfo model.FollowInfo

		err := c.BindJSON(&followInfo)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var result bson.M
		filter := bson.M{"user_id": followInfo.Followed_Id, "follower_list": followInfo.Follower_Id}
		err1 := userCollection.FindOne(ctx, filter).Decode(&result)
		if err1 != nil {
			if err1 == mongo.ErrNoDocuments {
				c.Header("Access-Control-Allow-Origin", "*")
				c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
				c.JSON(http.StatusOK, bson.M{"res": "0"})
				return
			}
			log.Fatal(err1)
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,token")
		c.JSON(http.StatusOK, bson.M{"res": "1"})

	}
}

func GetFollowInfo() gin.HandlerFunc {
	return func(c *gin.Context) {
		userId := c.Param("user_id")
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "user_id", Value: userId}}}}
		addFieldStage1 := bson.D{
			{Key: "$addFields", Value: bson.D{
				{Key: "follower_count", Value: bson.D{
					{Key: "$size", Value: "$follower_list"}}}}}}
		addFieldStage2 := bson.D{
			{Key: "$addFields", Value: bson.D{
				{Key: "followed_count", Value: bson.D{
					{Key: "$size", Value: "$followed_list"}}}}}}
		projectStage := bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "_id", Value: 0},
				{Key: "follower_count", Value: "$follower_count"},
				{Key: "followed_count", Value: "$followed_count"},
				{Key: "follower_list", Value: "$follower_list"},
				{Key: "followed_list", Value: "$followed_list"}}}}
		result, err := userCollection.Aggregate(ctx, mongo.Pipeline{matchStage, addFieldStage1, addFieldStage2, projectStage})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while counting liked_count"})
			return
		}
		var allUser []bson.M
		err = result.All(ctx, &allUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error occured while binding results"})
			return
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		c.JSON(http.StatusOK, allUser)
	}
}
