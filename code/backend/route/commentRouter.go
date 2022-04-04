package route
import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/controller"
	"github.com/gin-gonic/gin"
)

func CommentRoutes(router *gin.Engine) {
	router.POST("/createcomment1", controller.Createcomment())
	//router.POST("/createreply", controller.Createreply())
}
