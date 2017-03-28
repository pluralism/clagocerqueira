package types

import "github.com/graphql-go/graphql"

var GeneralObjectDataType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GeneralObjectData",
	Fields: graphql.Fields{
		"objects_data": &graphql.Field{
			Type: graphql.NewList(GeneralPersonType),
		},
		"total_items": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
