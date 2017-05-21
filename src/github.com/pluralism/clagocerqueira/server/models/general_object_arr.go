package models

import "gopkg.in/mgo.v2/bson"

type GeneralObjectArr struct {
	ID bson.ObjectId `json:"id" bson:"_id"`
	Name string `json:"name" bson:"name"`
	Objects []GeneralObjectData `json:"objects" bson:"objects"`
}
