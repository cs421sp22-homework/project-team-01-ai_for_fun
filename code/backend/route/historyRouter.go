package route
import (
	"github.com/cs421sp22-homework/project-team-01-ai_for_fun/controller"
	"github.com/gin-gonic/gin"
)
func HistoryRoutes(router *gin.Engine) {
	router.GET("/gethistory/:user_id", controller.Gethis())
	router.POST("/deletehistory", controller.Deletehis())
}
