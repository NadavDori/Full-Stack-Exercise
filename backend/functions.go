package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/go-github/v40/github"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
)

// Get github token from env variable
func getGithubToken() string {

  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }
	githubToken := os.Getenv("GITHUB_ACCESS_TOKEN")

	return githubToken
	
}


// Get authenticated user
func getClient(accessToken string) github.Client {

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: accessToken},
	)
	httpClient := oauth2.NewClient(ctx, ts)
	githubClient := github.NewClient(httpClient)

	return *githubClient

}


// Get Repository List
func getRepoList(client github.Client) ([]*github.Repository,*github.Response, error) {

	repos := []Repository{}
	ctx := context.Background()
	repoList, _, err := client.Repositories.List(ctx, "", nil)
	
	if err != nil {
		log.Fatal("Error found: ", err, repoList)
		return nil, nil, err
	}

	// Loop over repos and append to repos array
	for _, repo := range repoList {
	r := Repository{*repo.ID, *repo.Name, *repo.Visibility, *repo.GitURL}
	repos = append(repos, r)
	}

	return repoList, nil, nil

}


// Get repos for authenticated user
func getUserRepositories(c *gin.Context, client github.Client)  {

	repoList, _, _ := getRepoList(client)
	c.JSON(http.StatusOK, gin.H{"data": repoList})

}