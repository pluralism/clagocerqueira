package models

import "gopkg.in/mgo.v2/bson"

type GeneralObject struct {
	ID      bson.ObjectId     `json:"id" bson:"_id"`
	Date    string            `json:"date" bson:"date"`
	Objects GeneralObjectData `json:"objects" bson:"objects"`
}
