package route

import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/controller"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(router *gin.Engine) {
	router.POST("user/register", controller.Register())
	router.POST("user/login", controller.Login())
	router.POST("/changeinfo/:user_id", controller.ChangeUser())
}
