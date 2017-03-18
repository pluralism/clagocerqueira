package queries

import (
	"errors"

	"github.com/graphql-go/graphql"
)

var RootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "CLagoCerqueiraRootQuery",
	Fields: graphql.Fields{
		"presidents": &graphql.Field{
			Description: "Extract objects in a given date",
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				_, ok := p.Args["date"].(string)

				if !ok {
					return nil, errors.New("the date does not exist")
				}
				return nil, nil
			},
		},
	},
})
