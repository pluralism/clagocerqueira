package mutations

import (
	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/types"
)

var RootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "CLagoCerqueiraRootMutation",
	Fields: graphql.Fields{
		"createMessage": &graphql.Field{
			Type:        types.MessageType,
			Description: "Create a new message",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
		},
	},
})
