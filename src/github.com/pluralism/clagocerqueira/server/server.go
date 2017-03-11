package main

import (
	"bytes"
	"log"

	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/mutations"
	"github.com/pluralism/clagocerqueira/server/queries"
	iris "gopkg.in/kataras/iris.v6"
	"gopkg.in/kataras/iris.v6/adaptors/cors"
	"gopkg.in/kataras/iris.v6/adaptors/httprouter"
	"gopkg.in/kataras/iris.v6/adaptors/view"
)

func main() {
	app := iris.New()

	app.Adapt(
		// Prints all errors to the os.Stdout
		iris.DevLogger(),
		// Router from adaptors/httprouter
		httprouter.New(),
		// HTML standard engine for all files inside "../client/app/views" folder with extension ".html"
		view.HTML("../client/app/views", ".html"),
		// Allows all origins
		cors.New(cors.Options{AllowedOrigins: []string{"*"}}))

	// Serve static files from "../client/app/static" to the GET route http://IP:Port/public
	app.StaticServe("../client/app/static", "/public")

	// Homepage of the application
	app.Get("/", homePageHandler)

	app.Post("/graphql", graphqlAPIHandler)

	// Start the server on port 8080
	app.Listen(":8080")
}

func homePageHandler(context *iris.Context) {
	// Enable gzip for better compression
	context.Render("index.html", iris.RenderOptions{"gzip": true})
}

func graphqlAPIHandler(context *iris.Context) {
	contentType := context.RequestHeader("Content-Type")

	if contentType != "application/graphql" {
		// Maps are reference types, so if we don't use make the value is nil
		res := make(map[string]interface{})
		res["error"] = "Bad Request"

		context.JSON(iris.StatusBadRequest, res)
		return
	}

	buf := new(bytes.Buffer)
	buf.ReadFrom(context.Request.Body)
	result := executeGraphQLQuery(buf.String(), schema)
	context.JSON(iris.StatusOK, result)
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

	if len(result.Errors) > 0 {
		log.Fatalf("Failed to execute query. Errors: %v", result.Errors)
	}

	return result
}
