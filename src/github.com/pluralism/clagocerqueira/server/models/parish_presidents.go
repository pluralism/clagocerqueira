package models

import (
	"math"

	"github.com/pluralism/clagocerqueira/server/constants"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)


type ParishPresidents struct {
	ID      bson.ObjectId     `json:"id" bson:"_id"`
	Name    string            `json:"name" bson:"name"`
	Dates  	GeneralObject 	  `json:"dates" bson:"dates"`
}




func GetPresidentsByParish(s *mgo.Session, name, date string, page int) *ParishPresidents {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PARISHES_PRESIDENTS_COLLECTION)
	offset := 10 * (page - 1)
	// Filter by name and date
	query := c.Pipe([]bson.M{{"$match": bson.M{"name": name}},
			 {"$unwind": "$dates"},
			 {"$match": bson.M{"dates.name": date}},
			 {"$project": bson.M{"name": 1,
				"dates.name": 1,
				"dates.objects.total_items": 1,
				"dates.objects.objects_data": bson.M{"$slice": []interface{}{
					"$dates.objects.objects_data", offset, 10}}}}})



	result := ParishPresidents{}
	// Return only one result from the query
	err := query.One(&result)

	// Something went wrong, just return nil
	if err != nil {
		return nil
	}

	// The maximum page an user can query for!
	maxPage := int(math.Ceil(float64(result.Dates.Objects.TotalItems) / 10))


	// If there are no results just return the object with no data
	if maxPage == 0 {
		// Update the maxPage value
		result.Dates.Objects.MaxPages = maxPage

		return &result
	}

	// There are no results after we've passed the limit of pages
	if page > maxPage || page < 1 {
		return nil
	}

	// Update the maxPage value
	result.Dates.Objects.MaxPages = maxPage

	// Return a reference to the result
	return &result
}