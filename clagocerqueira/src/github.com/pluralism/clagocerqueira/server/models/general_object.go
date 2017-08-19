package models

import (
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


func GeyNatureByName(s *mgo.Session, name string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.NATURE_COLLECTION)
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





func GetAuthorsByDate(s *mgo.Session, date string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.AUTHORS_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": date}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := GeneralObject{}
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



func GetCityCouncilByDate(s *mgo.Session, date string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.CITY_COUNCIL_COLLECTION)

	/**
	 * Find by the date field in the city council collection
	 * Limit the number of objects returned in the "objects" field
	*/
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": date}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := GeneralObject{}
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



func GetPersonalities(s *mgo.Session, category string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PERSONALITIES_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": category}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := GeneralObject{}
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




func GetAssociationsByNameId(s *mgo.Session, name string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.ASSOCIATIONS_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": name}).
		Select(bson.M{"objects.objects_data":
	bson.M{"$slice": []int{offset, 10}}})

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



func GetCouncilmenByDate(s *mgo.Session, date string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.COUNCILMEN_COLLECTION)
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": date}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := GeneralObject{}
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


func GetPresidentsByDate(s *mgo.Session, date string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PRESIDENTS_COLLECTION)

	/**
	 * Find by the date field in the presidents collection
	 * Limit the number of objects returned in the "objects" field
	 */
	offset := 10 * (page - 1)
	query := c.Find(bson.M{"name": date}).
		Select(bson.M{"objects.objects_data": bson.M{"$slice": []int{offset, 10}}})

	result := GeneralObject{}
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


func GetPressByNameId(s *mgo.Session, name string, page int) *GeneralObject {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.PRESS_COLLECTION)
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
