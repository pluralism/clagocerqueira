package main

import (
	iris "gopkg.in/kataras/iris.v6"
	"gopkg.in/kataras/iris.v6/adaptors/cors"
	"gopkg.in/kataras/iris.v6/adaptors/httprouter"
)

func main() {
	app := iris.New()

	app.Adapt(
		// Prints all errors to the os.Stdout
		iris.DevLogger(),
		// Router from adaptors/httprouter
		httprouter.New(),
		// Allows all origins
		cors.New(cors.Options{AllowedOrigins: []string{"*"}}))

	app.Get("/", func(context *iris.Context) {

	})
}
