package main

import (
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

	app.Get("/", homePageHandler)

	// Start the server on port 8080
	app.Listen(":8080")
}

func homePageHandler(context *iris.Context) {
	// Enable gzip for better compression
	context.Render("index.html", iris.RenderOptions{"gzip": true})
}
