package models

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

/*
Message represents a message that a user is able to send in the
contact form.
*/
type Message struct {
	ID        bson.ObjectId `json:"id" bson:"_id"`
	Name      string        `json:"name" bson:"name"`
	Email     string        `json:"email" bson:"email"`
	Phone     string        `json:"phone" bson:"phone"`
	Subject   string        `json:"subject" bson:"subject"`
	Content   string        `json:"content" bson:"content"`
	CreatedAt time.Time     `json:"created_at" bson:"created_at"`
}
