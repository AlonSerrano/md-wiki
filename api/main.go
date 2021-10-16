package main

import (
	"github.com/AlonSerrano/md-wiki/pkg/libs"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/articles/", libs.GetArticles)
	router.GET("/articles/:name", libs.GetArticlesByKey)
	router.PUT("/articles/:name", libs.PutArticle)
	router.Run("0.0.0.0:9090")
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
