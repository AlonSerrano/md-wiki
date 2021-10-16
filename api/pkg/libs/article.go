package libs

import (
	"errors"
	"net/http"

	"github.com/AlonSerrano/md-wiki/pkg/models"
	"github.com/gin-gonic/gin"
)

var articles = []models.Article{}

func GetArticles(c *gin.Context) {
	c.JSON(http.StatusOK, articles)
}

func GetArticlesByKey(c *gin.Context) {
	name := c.Param("name")
	if index, err := searchByKey(name); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "Not found"})
		return
	} else {
		c.JSON(http.StatusOK, articles[index])
		return
	}

}

func PutArticle(c *gin.Context) {
	name := c.Param("name")
	if name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Bad request"})
		return
	}
	if data, err := c.GetRawData(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "Bad request"})
		return
	} else {
		value := string(data)
		if value == "" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "Bad request"})
			return
		}
		var article = models.Article{
			Key:   name,
			Value: value,
		}
		if index, err := searchByKey(article.Key); err != nil {
			addArticle(article)
			c.JSON(http.StatusCreated, gin.H{"status": "Created"})
			return
		} else {
			updateArticule(article, index)
			c.JSON(http.StatusOK, gin.H{"status": "OK"})
			return
		}
	}

}

func addArticle(a models.Article) {
	articles = append(articles, a)
}

func updateArticule(a models.Article, index int) {
	articles[index] = a
}

func searchByKey(key string) (int, error) {
	index := 0
	founded := false
	for i := 0; i < len(articles); i++ {
		if articles[i].Key == key {
			index = i
			founded = true
		}
	}
	if founded {
		return index, nil
	} else {
		return 0, errors.New("not found")
	}
}
