package queries

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/controllers"
	"github.com/pluralism/clagocerqueira/server/refs"
	"github.com/pluralism/clagocerqueira/server/types"
)

var RootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "CLagoCerqueiraRootQuery",
	Fields: graphql.Fields{
		"presidents": &graphql.Field{
			Type:        types.GenericListType,
			Description: "Extract objects that are defined in a given date",
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.Int,
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date, ok := p.Args["date"].(string)
				page, pageOk := p.Args["page"].(int)

				if !ok {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the date does not exist")
				}

				if !pageOk {
					// Return no objects if the "page" field is not passed in the query
					return nil, errors.New("the \"page\" field was not provided")
				}

				result := controllers.GetPresidentsByDate(refs.Session, date, page)

				if result != nil {
					return result, nil
				}

				return nil, errors.New("the presidents could not be extracted")
			},
		},
	},
})
