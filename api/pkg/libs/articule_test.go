package libs

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/AlonSerrano/md-wiki/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TestGetArticles checking
// for a valid return value.
func TestGetArticles(t *testing.T) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	GetArticles(c)
	assert.Equal(t, 200, w.Code) // or what value you need it to be

	var got = []models.Article{}
	err := json.Unmarshal(w.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}
	want := []models.Article{}
	assert.Equal(t, want, got)
}

// TestPutArticle Test new articule
func TestPutArticle(t *testing.T) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	body := bytes.NewBufferString("Example of content")
	c.Request, _ = http.NewRequest("PUT",
		"", body)
	c.Params = []gin.Param{{
		Key:   "name",
		Value: "hello",
	}}
	PutArticle(c)
	assert.Equal(t, 201, w.Code) // or what value you need it to be

	var got gin.H
	err := json.Unmarshal(w.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}
	want := gin.H{"status": "Created"}
	assert.Equal(t, want, got)
}

// TestPutArticle Test error empty key new articule
func TestPutArticleBad(t *testing.T) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	body := bytes.NewBufferString("")
	c.Request, _ = http.NewRequest("PUT",
		"", body)
	c.Params = []gin.Param{{
		Key:   "name",
		Value: "",
	}}
	PutArticle(c)
	assert.Equal(t, 400, w.Code) // or what value you need it to be

	var got gin.H
	err := json.Unmarshal(w.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}
	want := gin.H{"status": "Bad request"}
	assert.Equal(t, want, got)
}
