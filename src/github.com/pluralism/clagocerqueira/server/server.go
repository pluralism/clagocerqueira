package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/models"
	"github.com/pluralism/clagocerqueira/server/mutations"
	"github.com/pluralism/clagocerqueira/server/queries"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/olivere/elastic.v5"
	"github.com/gorilla/handlers"
)

func main() {
	var err error
	models.Session, err = mgo.Dial("mongodb://localhost")

	if err != nil {
		panic(err)
	}

	// Start ElasticSearch components here
	models.Context = context.Background()
	models.Elastic, err = elastic.NewClient()

	if err != nil {
		panic(err)
	}

	// Make sure the session is actually closed
	defer models.Session.Close()

	models.Session.SetMode(mgo.Monotonic, true)
	corsObj := handlers.AllowedOrigins([]string{"*"})

	r := mux.NewRouter()
	r.HandleFunc("/", homePageRedirectHandler)
	// Match all GET routes under /pt/ to homePageHandler
	r.HandleFunc(`/pt/{rest:.*}`, homePageHandler)
	// Route used to handle API requests
	r.HandleFunc("/graphql", graphqlAPIHandler).
		Methods("POST").
		Headers("Content-Type", "application/graphql")

	// Serve static files
	r.PathPrefix("/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./static/"))))


	fmt.Println("[*] Server started...")
	// Enable gzip for better compression and start the server
	http.ListenAndServe(":8080", handlers.CompressHandler(handlers.CORS(corsObj)(r)))
}


func homePageRedirectHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/pt/", 301)
}


func homePageHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../client/app/views/index.html")
}


func graphqlAPIHandler(w http.ResponseWriter, r *http.Request) {
	buf := new(bytes.Buffer)
	buf.ReadFrom(r.Body)

	result := executeGraphQLQuery(buf.String(), schema)
	json.NewEncoder(w).Encode(result)
}


var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Mutation: mutations.RootMutation,
	Query:    queries.RootQuery,
})


func executeGraphQLQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})

	// Show errors to the user if something goes wrong
	if len(result.Errors) > 0 {
		log.Printf("Failed to execute query. Errors: %v", result.Errors)
	}

	return result
}
