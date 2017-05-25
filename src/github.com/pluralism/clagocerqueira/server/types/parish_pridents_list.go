package types

import (
	"errors"
	"fmt"

	"github.com/graphql-go/graphql"
)


var ParishPresidentsList = graphql.NewObject(graphql.ObjectConfig{
	Name: "ParishPresidentsList",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dates": &graphql.Field{
			Type: GeneralListType,
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date := p.Args["date"].(string)
				page := p.Args["page"].(int)
				fmt.Println(date)
				fmt.Println(page)
				//_, ok := p.Source.(*models.ParishPresidents)
				//if !ok {
					//return nil, errors.New("Can't convert map to type *models.ParishPresidents")
				//}
				return nil, errors.New("pasoidpaosdiaspodisapd")
			},
		},
	},
})