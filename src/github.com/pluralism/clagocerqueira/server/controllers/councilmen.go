package controllers

import (
	"github.com/pluralism/clagocerqueira/server/models"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func GetCouncilmenByDate(s *mgo.Session, date string, page int) *models.GenericList {
	session := s.Copy()
	defer session.Close()

	c := session.DB("clagocerqueira").C("councilmen")
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"date": date}).
		Select(bson.M{"objects": bson.M{"$slice": []int{offset, 10}}})

	var result []models.GenericList
	err := query.All(&result)

	if err != nil {
		return nil
	}

	if len(result) > 1 {
		return nil
	}

	if page > result[0].TotalPages || page < 1 {
		result[0].Objects = nil
	}

	// Return a reference to the first result
	return &result[0]
}
