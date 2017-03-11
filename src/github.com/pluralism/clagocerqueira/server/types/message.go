package types

import "github.com/graphql-go/graphql"

/*
MessageType defines a custom GraphQL ObjectType for our
struct Message in the models package. The fields in the
MessageType maps with the JSON tags for the fields in the
struct and the field type matches the field type in the struct
*/
var MessageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Message",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"email": &graphql.Field{
			Type: Email,
		},
		"phone": &graphql.Field{
			Type: graphql.String,
		},
		"subject": &graphql.Field{
			Type: graphql.String,
		},
		"content": &graphql.Field{
			Type: graphql.String,
		},
		"created_at": &graphql.Field{
			Type: graphql.String,
		},
	},
})
