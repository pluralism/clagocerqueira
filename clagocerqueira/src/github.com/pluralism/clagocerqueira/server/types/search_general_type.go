package types

import "github.com/graphql-go/graphql"

var SearchObjectsDataType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SearchObjectsDataType",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"image": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
		"extra": &graphql.Field{
			Type: graphql.String,
		},
	},
})
