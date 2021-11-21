package main

import (
	"context"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)

type Repository struct {
	ID int64 `json:"id"`
	Name string `json:"name"`
	Visibility string `json:"visibility"`
	GitURL string `json:"url"`
}


func main() {

	githubToken := getGithubToken()

	githubClient := getClient(githubToken)

	router := gin.Default()

	// CORS Middleware
	router.Use(cors.Middleware(cors.Config{
		Origins:        "*",
		Methods:        "GET, PUT, POST, DELETE",
		RequestHeaders: "Origin, Authorization, Content-Type",
		ExposedHeaders: "",
		Credentials: true,
		ValidateHeaders: false,
	}))

	// Get Repos Route
	router.GET("/", func (c *gin.Context) {
		getUserRepositories(c, githubClient)
	})

	// Delete Repo Route
	router.DELETE("/:name", func (c *gin.Context){

		ctx := context.Background()
		fmt.Println("IN DELETE METHOD")
		user, _, _ := githubClient.Users.Get(ctx, "")
		response, err := githubClient.Repositories.Delete(ctx, *user.Login, c.Param("name"))
		if err != nil {
			log.Fatal("Error found: ", err)
		}
		fmt.Println(response)

	})

	router.Run("localhost:4200")

}