package models

import (
	"encoding/json"
	"fmt"

	"gopkg.in/olivere/elastic.v5"
)

type SearchResults struct {
	Results []SearchGeneralObject `json:"results"`
}


func SearchByType(value, obj_type string) *SearchResults {
	query := elastic.NewMatchQuery("_all", value)
	searchResult, err := Elastic.Search().
		Query(query).
		Type(obj_type).
		From(0).Size(10).
		Pretty(true).
		Do(Context)

	if err != nil {
		fmt.Println("[!] Something went wrong while searching by type!")
		return nil
	}

	var res []SearchGeneralObject
	if searchResult.Hits.TotalHits > 0 {
		// Iterate through results
		for _, hit := range searchResult.Hits.Hits {
			var t SearchGeneralObject
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

	var s SearchResults = SearchResults{
		Results: res,
	}

	return &s
}



func SearchHomepage(value string) *SearchResults {
	query := elastic.NewMatchQuery("_all", value)
	searchResult, err := Elastic.Search().
		Query(query).
		From(0).Size(10).
		Pretty(true).
		Do(Context)

	if err != nil {
		fmt.Println("[!] Something went wrong while searching in the homepage!")
		return nil
	}

	var res []SearchGeneralObject
	if searchResult.Hits.TotalHits > 0 {
		// Iterate through results
		for _, hit := range searchResult.Hits.Hits {
			var t SearchGeneralObject
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

	var s SearchResults = SearchResults{
		Results: res,
	}

	return &s
}