package controllers

import (
	"math"

	"github.com/pluralism/clagocerqueira/server/constants"
	"github.com/pluralism/clagocerqueira/server/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)


func GetPresidentsByParish(s *mgo.Session, name, date string, page int) *models.ParishPresidents {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PARISHES_PRESIDENTS_COLLECTION)
	offset := 10 * (page - 1)
	// Filter by name and date
	query := c.Find(bson.M{"name": name, "dates.name": date}).
		Select(bson.M{"dates.objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := models.ParishPresidents{}
	// Return only one result from the query
	err := query.One(&result)


	// Something went wrong, just return nil
	if err != nil {
		return nil
	}

	// The maximum page an user can query for!
	maxPage := int(math.Ceil(float64(result.Dates[0].Objects.TotalItems) / 10))


	// There are no results after we've passed the limit of pages
	if page > maxPage || page < 1 {
		return nil
	}

	// Update the maxPage value
	result.Dates[0].Objects.MaxPages = maxPage

	// Return a reference to the result
	return &result
}


func GetFestivitiesForParish(s *mgo.Session, name string, page int) *models.GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PARISHES_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": name}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})


	result := models.GeneralObject{}
	// Return only one result
	err := query.One(&result)

	// Something went wrong, just return nil
	if err != nil {
		return nil
	}

	// The maximum page an user can query for!
	maxPage := int(math.Ceil(float64(result.Objects.TotalItems) / 10))

	// There are no results after we've passed the limit of pages
	if page > maxPage || page < 1 {
		return nil
	}

	// Update the maxPage result
	result.Objects.MaxPages = maxPage

	// Return a reference to the result
	return &result
}