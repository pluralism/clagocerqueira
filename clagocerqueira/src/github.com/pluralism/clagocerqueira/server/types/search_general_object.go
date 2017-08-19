package types

import "github.com/graphql-go/graphql"


var SearchResultsObjectType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SearchGeneralObjectType",
	Fields: graphql.Fields{
		"results": &graphql.Field{
			Type: graphql.NewList(SearchGeneralObjectType),
		},
	},
})


var SearchGeneralObjectType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SearchGeneralObjectType",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"_type": &graphql.Field{
			Type: graphql.String,
		},
		"_index": &graphql.Field{
			Type: graphql.String,
		},
		"objects": &graphql.Field{
			Type: graphql.NewNonNull(SearchObjectType),
		},
	},
})



var SearchObjectType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SearchObjectType",
	Fields: graphql.Fields{
		"objects_data": &graphql.Field{
			Type: graphql.NewNonNull(SearchObjectsDataType),
		},
		"total_items": &graphql.Field{
			Type: graphql.Int,
		},
	},
})