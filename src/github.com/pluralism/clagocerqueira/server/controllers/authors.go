package controllers

import (
	"math"

	"github.com/pluralism/clagocerqueira/server/constants"
	"github.com/pluralism/clagocerqueira/server/models"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func GetAuthorsByDate(s *mgo.Session, date string, page int) *models.GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.AUTHORS_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": date}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := models.GeneralObject{}
	err := query.One(&result)

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
