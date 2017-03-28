package types

import (
	"github.com/graphql-go/graphql"
)

var GeneralListType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GeneralList",
	Fields: graphql.Fields{
		"date": &graphql.Field{
			Type: graphql.String,
		},
		"objects": &graphql.Field{
			Type: graphql.NewNonNull(GeneralObjectDataType),
		},
	},
})
