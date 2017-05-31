package models

import (
	"time"

	"github.com/pluralism/clagocerqueira/server/constants"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

/*
 * Message represents a message that a user is able to send in the
 * contact form.
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




func AddMessage(s *mgo.Session, message *Message) bool {
	session := s.Copy()
	defer session.Close()

	c := session.DB(constants.DB_NAME).C(constants.MESSAGES_COLLECTION)

	// Assign an ID to the message
	message.ID = bson.NewObjectId()

	if !message.ID.Valid() {
		return false
	}

	// Update the CreatedAt field according to the ID of the document
	message.CreatedAt = message.ID.Time()
	err := c.Insert(message)

	if err != nil {
		return false
	} else {
		return true
	}

	return false
}