package route

import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/controller"
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	router.POST("/follow", controller.Follow())
	router.POST("/unfollow", controller.UnFollow())
	router.Use(middleware.Authenticate())
	router.GET("/users", controller.GetUsers())
	router.GET("/users/:user_id", controller.GetUser())
}
