package controllers

import (
	"math"

	"github.com/pluralism/clagocerqueira/server/constants"
	"github.com/pluralism/clagocerqueira/server/models"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func GetPersonalities(s *mgo.Session, category string, page int) *models.GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PERSONALITIES_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": category}).
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

	// Update the maxPages value of the GeneralObjectData struct
	result.Objects.MaxPages = maxPage

	// Return a reference (address of) to the result variable
	return &result
}
