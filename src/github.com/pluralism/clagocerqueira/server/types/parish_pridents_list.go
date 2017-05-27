package types

import (
	"github.com/graphql-go/graphql"
)


var ParishPresidentsList = graphql.NewObject(graphql.ObjectConfig{
	Name: "ParishPresidentsList",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dates": &graphql.Field{
			Type: graphql.NewNonNull(GeneralListType),
		},
	},
})