package types

import "github.com/graphql-go/graphql"

var GenericPersonType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GenericPerson",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"image": &graphql.Field{
			Type: graphql.String,
		},
		"description": &graphql.Field{
			Type: graphql.String,
		},
	},
})
