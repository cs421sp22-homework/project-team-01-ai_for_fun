package helper

import (
	"fmt"
	"log"
	"os"
	"reflect"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

func GetFile(file_name string) (string, error) {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	S3_BUCKET := os.Getenv("S3_BUCKET")
	AWS_REGION := os.Getenv("AWS_REGION")
	AWS_ACCESS_KEY_ID := os.Getenv("AWS_ACCESS_KEY_ID")
	AWS_SECRET_ACCESS_KEY := os.Getenv("AWS_SECRET_ACCESS_KEY")

	sess, err := session.NewSession(
		&aws.Config{
			Region: aws.String(AWS_REGION),
			Credentials: credentials.NewStaticCredentials(
				AWS_ACCESS_KEY_ID,
				AWS_SECRET_ACCESS_KEY,
				"", // a token will be created when the session it's used.
			),
		})
	if err != nil {
		fmt.Println("Failed to create aws session: ", err)
		return "", err
	}

	svc := s3.New(sess)
	r, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(S3_BUCKET),
		Key:    aws.String(file_name),
	})
	url, err := r.Presign(2 * time.Hour)
	if err != nil {
		fmt.Println("Failed to generate a pre-signed url ", err)
		return "", err
	}
	return url, nil

}

func UpdateUrl(filename string) (string, error) {
	if strings.HasPrefix(filename, "id=") {
		id := filename[3:]
		url, err := GetFile(id)
		return url, err
	}
	return filename, nil
}

func UpdateAvater(allRecord bson.A) (bson.A, error) {
	for _, record_i := range allRecord {
		record_i := record_i.(bson.M)
		if user_avater, ok := record_i["user_avater"]; ok {
			user_avater, err := UpdateUrl(user_avater.(string))
			if err != nil {
				return allRecord, err
			}
			record_i["user_avater"] = user_avater
		}
	}
	return allRecord, nil
}

func isNil(i interface{}) bool {
	return i == nil || reflect.ValueOf(i).IsNil()
}

func UpdatePost(allPost []bson.M) ([]bson.M, error) {
	for _, post_i := range allPost {
		if content_url, ok := post_i["content_url"]; ok {
			content_url, err := UpdateUrl(content_url.(string))
			if err != nil {
				return allPost, err
			}
			post_i["content_url"] = content_url
		}
		if user_avater, ok := post_i["user_avater"]; ok {
			user_avater, err := UpdateUrl(user_avater.(string))
			if err != nil {
				return allPost, err
			}
			post_i["user_avater"] = user_avater
		}
		if comment, ok := post_i["comment"]; ok {
			comment, err := UpdateAvater(comment.(bson.A))
			if err != nil {
				return allPost, err
			}
			for _, comment_i := range comment {
				comment_i := comment_i.(bson.M)
				if reply, ok := comment_i["reply"]; ok {
					reply, err := UpdateAvater(reply.(bson.A))
					if err != nil {
						return allPost, err
					}
					comment_i["reply"] = reply
				}
			}
			post_i["comment"] = comment
		}
	}
	return allPost, nil
}

func UpdateEntity(allEntity []bson.M) ([]bson.M, error) {
	for _, entity_i := range allEntity {
		if imageUrl, ok := entity_i["imageUrl"]; ok {
			imageUrl, err := UpdateUrl(imageUrl.(string))
			if err != nil {
				return allEntity, err
			}
			entity_i["imageUrl"] = imageUrl
		}
		if vedioUrl, ok := entity_i["vedioUrl"]; ok {
			vedioUrl, err := UpdateUrl(vedioUrl.(string))
			if err != nil {
				return allEntity, err
			}
			entity_i["vedioUrl"] = vedioUrl
		}
	}
	return allEntity, nil
}
