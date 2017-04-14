package queries

import (
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/controllers"
	"github.com/pluralism/clagocerqueira/server/refs"
	"github.com/pluralism/clagocerqueira/server/types"
)

func getAssociations() *graphql.Field {
	return &graphql.Field{
		Type:        types.GeneralListType,
		Description: "Extract associations that match a given name",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			name, nameOK := p.Args["name"].(string)
			page, pageOk := p.Args["page"].(int)

			if !nameOK {
				// Return no object (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !pageOk {
				// Return no objects if the "page" field is not passed in the query
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := controllers.GetAssociationsByNameId(refs.Session, name, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the associations could not be extracted from the database
			return nil, errors.New("the associations could not be extracted")
		},
	}
}


func getNaturalPatrimony() *graphql.Field {
	return &graphql.Field{
		Type: types.GeneralListType,
		Description: "Extract natural patrimony data from the database",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			name, nameOK := p.Args["name"].(string)
			page, pageOK := p.Args["page"].(int)

			if !nameOK {
				// Return no object (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !pageOK {
				// Return no objects if the "page" field is not passed in the query
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := controllers.GetNaturalPatrimonyByName(refs.Session, name, page)

			if result != nil {
				// Success, return the result without errors
				return result, nil
			}

			return nil, errors.New("the natural patrimony data could not be extracted")
		},
	}
}


func getCityCouncil() *graphql.Field {
	return &graphql.Field{
		Type: types.GeneralListType,
		Description: "Extracts the city council for a given date",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			date, dateOK := p.Args["name"].(string)
			page, pageOK := p.Args["page"].(int)

			if !dateOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !pageOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := controllers.GetcityCouncilByDate(refs.Session, date, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the city council data could not be extracted from the database
			return nil, errors.New("the city council data could not be extracted")
		},
	}
}

func getFestivitiesForParish() *graphql.Field {
	return &graphql.Field{
		Type: types.GeneralListType,
		Description: "Extracts festivities for a given parish",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			name, nameOK := p.Args["name"].(string)
			page, pageOK := p.Args["page"].(int)

			if !nameOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !pageOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := controllers.GetFestivitiesForParish(refs.Session, name, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the parish data could not be extracted from the database
			return nil, errors.New("the parish data could not be extracted")
		},
	}
}

func getPress() *graphql.Field {
	return &graphql.Field{
		Type:        types.GeneralListType,
		Description: "Extract press that match a given name",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			name, nameOK := p.Args["name"].(string)
			page, pageOk := p.Args["page"].(int)

			if !nameOK {
				// Return no object (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !pageOk {
				// Return no objects if the "page" field is not passed in the query
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := controllers.GetPressByNameId(refs.Session, name, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the press data could not be extracted from the database
			return nil, errors.New("the press data could not be extracted")
		},
	}
}

var RootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "CLagoCerqueiraRootQuery",
	Fields: graphql.Fields{
		"presidents": &graphql.Field{
			Type:        types.GeneralListType,
			Description: "Extract presidents that are defined in a given date and page",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date, dateOK := p.Args["name"].(string)
				page, pageOk := p.Args["page"].(int)

				if !dateOK {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the \"date\" argument was not provided")
				}

				if !pageOk {
					// Return no objects if the "page" field is not passed in the query
					return nil, errors.New("the \"page\" argument was not provided")
				}

				result := controllers.GetPresidentsByDate(refs.Session, date, page)

				if result != nil {
					return result, nil
				}

				// Something went wrong, return nil and an error informing that
				// the presidents could not be extracted from the database
				return nil, errors.New("the presidents could not be extracted")
			},
		},
		"councilmen": &graphql.Field{
			Type:        types.GeneralListType,
			Description: "Extract councilmen that are defined in a given date and page",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date, dateOK := p.Args["name"].(string)
				page, pageOK := p.Args["page"].(int)

				if !dateOK {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the \"date\" argument was not provided")
				}

				if !pageOK {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the \"page\" argument was not provided")
				}

				result := controllers.GetCouncilmenByDate(refs.Session, date, page)

				if result != nil {
					// Everything went fine, return the list of councilmen
					return result, nil
				}

				// Something went wrong, return nil and an error informing that
				// the councilmen could not be extracted from the database
				return nil, errors.New("the councilmen could not be extracted")
			},
		},
		"associations": getAssociations(),
		"natural_patrimony": getNaturalPatrimony(),
		"press":        getPress(),
		"festivities": 	getFestivitiesForParish(),
		"city_council": getCityCouncil(),
		"authors": &graphql.Field{
			Type:        types.GeneralListType,
			Description: "Extract authors that are defined in a given date and page",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date, dateOK := p.Args["name"].(string)
				page, pageOK := p.Args["page"].(int)

				if !dateOK {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the \"date\" argument was not provided")
				}

				if !pageOK {
					// Return no object (nil) and the error to the user
					return nil, errors.New("the \"page\" argument was not provided")
				}

				result := controllers.GetAuthorsByDate(refs.Session, date, page)

				if result != nil {
					// Everything went fine, return the list of councilmen
					return result, nil
				}

				// Something went wrong, return nil and an error informing that
				// the authors could not be extracted from the database
				return nil, errors.New("the authors could not be extracted")
			},
		},
		"personalities": &graphql.Field{
			Type:        types.GeneralObjectDataType,
			Description: "Extract personalities that are defined in a given page",
			Args: graphql.FieldConfigArgument{
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				page, pageOK := p.Args["page"].(int)

				if !pageOK {
					// Return no objects if the "page" field is not passed in the query
					return nil, errors.New("the \"page\" arugment was not provided")
				}

				result := controllers.GetPersonalities(refs.Session, page)

				if result != nil {
					// Everything went fine, return the list of personalities
					return result, nil
				}

				// Something went wrong, return nil and an error information that
				// the personalities could not be extracted from the database
				return nil, errors.New("the personalities could not be extracted")
			},
		},
	},
})
