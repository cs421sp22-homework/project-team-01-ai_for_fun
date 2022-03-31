package route

import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/controller"
	"github.com/gin-gonic/gin"
)

func PostRoutes(router *gin.Engine) {
	router.GET("/getpost", controller.Getpost())
	router.GET("/getuserpost/:user_id", controller.Getuserpost())
	router.POST("/createpost", controller.Createpost())
	router.POST("/deletepost", controller.Deletepost())
	router.POST("/likepost", controller.Likepost())
}
