package model

type Entity struct {
	Image_name string `json:"imagename"`
	Video_name string `json:"videoname"`
	Image_url  string `json:"imgUrl"`
	VedioUrl   string `json:"vedioUrl"`
	Topic      string `json:"topic"`
	Mode       string `json:"mode"`
}
