package queries

import (
	"errors"
	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/models"
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

			result := models.GetAssociationsByNameId(models.Session, name, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the associations could not be extracted from the database
			return nil, errors.New("the associations could not be extracted")
		},
	}
}


func getNature() *graphql.Field {
	return &graphql.Field{
		Type: types.GeneralListType,
		Description: "Extract nature data from the database",
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

			result := models.GeyNatureByName(models.Session, name, page)

			if result != nil {
				// Success, return the result without errors
				return result, nil
			}

			return nil, errors.New("the nature data could not be extracted")
		},
	}
}


func getParishesPresidents() *graphql.Field {
	return &graphql.Field{
		Type: types.ParishPresidentsList,
		Description: "Extract the presidents from a given parish, in a given date",
		Args: graphql.FieldConfigArgument{
			"name": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"date": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"page": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.Int),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			name, nameOK := p.Args["name"].(string)
			date, dateOK := p.Args["date"].(string)
			page, pageOK := p.Args["page"].(int)

			if !nameOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"name\" argument was not provided")
			}

			if !dateOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"date\" argument was not provided")
			}

			if !pageOK {
				// Return no objects (nil) and the error to the user
				return nil, errors.New("the \"page\" argument was not provided")
			}

			result := models.GetPresidentsByParish(models.Session, name, date, page)

			if result != nil {
				return result, nil
			}


			return nil, errors.New("the presidents of the given parish could not be extracted")
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

			result := models.GetCityCouncilByDate(models.Session, date, page)

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

			result := models.GetFestivitiesForParish(models.Session, name, page)

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

			result := models.GetPressByNameId(models.Session, name, page)

			if result != nil {
				return result, nil
			}

			// Something went wrong, return nil and an error informing that
			// the press data could not be extracted from the database
			return nil, errors.New("the press data could not be extracted")
		},
	}
}

func searchByType() *graphql.Field  {
	return &graphql.Field{
		Type: types.SearchResultsObjectType,
		Description: "Perform searches by a specific type and value",
		Args: graphql.FieldConfigArgument{
			"value": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
			"type": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			value, valueOK := p.Args["value"].(string)
			objType, typeOK := p.Args["type"].(string)

			if !valueOK {
				return nil, errors.New("the \"value\" argument was not provided")
			}

			if !typeOK {
				return nil, errors.New("the \type\" argument was not provided")
			}

			result := models.SearchByType(value, objType)

			if result != nil {
				return result, nil
			}

			return nil, errors.New("the search by type could not be performed")
		},
	}
}


func searchHomepage() *graphql.Field {
	return &graphql.Field{
		Type: types.SearchResultsObjectType,
		Description: "Perform searches on the homepage",
		Args: graphql.FieldConfigArgument{
			"value": &graphql.ArgumentConfig{
				Type: graphql.NewNonNull(graphql.String),
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			value, valueOK := p.Args["value"].(string)

			if !valueOK {
				return nil, errors.New("the \"value\" argument was not provided")
			}

			result := models.SearchHomepage(value)

			if result != nil {
				return result, nil
			}

			return nil, errors.New("the search could not be performed")
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

				result := models.GetPresidentsByDate(models.Session, date, page)

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

				result := models.GetCouncilmenByDate(models.Session, date, page)

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
		"nature": getNature(),
		"press":        getPress(),
		"festivities": 	getFestivitiesForParish(),
		"city_council": getCityCouncil(),
		"parishes_presidents": getParishesPresidents(),
		"search_homepage": searchHomepage(),
		"search_type": searchByType(),
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

				result := models.GetAuthorsByDate(models.Session, date, page)

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
			Type:        types.GeneralListType,
			Description: "Extract personalities that are defined in a given page",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"page": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				category, categoryOK := p.Args["name"].(string)
				page, pageOK := p.Args["page"].(int)


				if !categoryOK {
					// Return no objects if the "name" argument is not passed in the query
					return nil, errors.New("the \"name\" argument was not provided")
				}

				if !pageOK {
					// Return no objects if the "page" argument is not passed in the query
					return nil, errors.New("the \"page\" argument was not provided")
				}

				result := models.GetPersonalities(models.Session, category, page)

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
