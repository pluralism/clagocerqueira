package controllers

import (
	"github.com/pluralism/clagocerqueira/server/models"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func GetPresidentsByDate(s *mgo.Session, date string) *models.GenericList {
	session := s.Copy()
	defer session.Close()

	c := session.DB("clagocerqueira").C("presidents")
	// Find by the date field in the presidents collections
	query := c.Find(bson.M{"date": date})

	var result []models.GenericList
	err := query.All(&result)

	if err != nil {
		return nil
	}

	// Make sure we're returning just one result!
	if len(result) > 1 {
		return nil
	}

	// Return a reference to the first result
	return &result[0]
}
