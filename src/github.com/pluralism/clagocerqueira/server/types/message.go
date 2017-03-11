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
		"Name": &graphql.Field{
			Type: graphql.String,
		},
		"Email": &graphql.Field{
			Type: graphql.String,
		},
		"Phone": &graphql.Field{
			Type: graphql.String,
		},
		"Subject": &graphql.Field{
			Type: graphql.String,
		},
		"Content": &graphql.Field{
			Type: graphql.String,
		},
	},
})
