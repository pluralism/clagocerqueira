package types

import (
	"github.com/graphql-go/graphql"
)

var GenericListType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GenericList",
	Fields: graphql.Fields{
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"objects": &graphql.Field{
			Type: graphql.NewList(GenericPersonType),
		},
		"total_pages": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Int),
		},
	},
})
