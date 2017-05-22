package models

import "gopkg.in/mgo.v2/bson"


type ParishPresident struct {
	ID      bson.ObjectId     `json:"id" bson:"_id"`
	Name    string            `json:"name" bson:"name"`
	Dates []GeneralObject 	  `json:"dates" bson:"dates"`
}
