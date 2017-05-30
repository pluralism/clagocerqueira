package controllers

import (
	"encoding/json"
	"fmt"

	"github.com/pluralism/clagocerqueira/server/models"
	"gopkg.in/olivere/elastic.v5"
)


func SearchHomepage(value string) *models.SearchResults {
	query := elastic.NewMatchQuery("_all", value)
	searchResult, err := models.Elastic.Search().
		Query(query).
		From(0).Size(10).
		Pretty(true).
		Do(models.Context)

	if err != nil {
		fmt.Println("[!] Something went wrong while search in the homepage!")
		return nil
	}

	var res []models.SearchGeneralObject
	if searchResult.Hits.TotalHits > 0 {
		// Iterate through results
		for _, hit := range searchResult.Hits.Hits {
			var t models.SearchGeneralObject
			err = json.Unmarshal(*hit.Source, &t)
			if err != nil {
				fmt.Println(err)
			}
			// Build the data that is not in the "_source" field
			t.Index = hit.Index
			t.Type = hit.Type

			// Append the object to the slice
			res = append(res, t)
		}
	}

	var s models.SearchResults = models.SearchResults{
		Results: res,
	}

	return &s
}