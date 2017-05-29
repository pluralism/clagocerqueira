package types

import "github.com/graphql-go/graphql"

var SearchGeneralType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GeneralPerson",
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
