package model

type Reply struct {
	Post_id     string             `json:"postid"`
	Comment_id  string             `json:"commentid"`
	Reply_content   string         `json:"replycontent"`
	User_avater string             `json:"useravater"`
	User_id     string             `json:"userid"`
	User_name   string             `json:"username"`
}