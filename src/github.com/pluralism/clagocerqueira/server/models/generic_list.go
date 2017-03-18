package models

import "gopkg.in/mgo.v2/bson"

type GenericList struct {
	ID      bson.ObjectId       `json:"id" bson:"_id"`
	Date    string              `json:"date" bson:"date"`
	Objects []GenericPersonElem `json:"objects" bson:"objects"`
}
