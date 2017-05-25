package models

import (
	"fmt"
	"math"

	"github.com/pluralism/clagocerqueira/server/constants"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)


type GeneralObject struct {
	ID      bson.ObjectId     `json:"id" bson:"_id"`
	Name    string            `json:"name" bson:"name"`
	Objects GeneralObjectData `json:"objects" bson:"objects"`
}



func GetObjectByNameDateAndPage(s *mgo.Session, name, date string, page int) {
	session := s.Clone()
	defer session.Close()
	fmt.Println("aqui")
}



func GetFestivitiesForParish(s *mgo.Session, name string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PARISHES_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": name}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})


	result := GeneralObject{}
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