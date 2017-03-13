package controllers

import (
	"errors"

	"github.com/pluralism/clagocerqueira/server/models"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AddMessage(s *mgo.Session, message *models.Message) (*models.Message, error) {
	session := s.Copy()
	defer session.Close()

	c := session.DB("clagocerqueira").C("messages")

	// Assign an ID to the message
	message.ID = bson.NewObjectId()

	if !message.ID.Valid() {
		return nil, errors.New("the ID is not valid")
	}

	// Update the CreatedAt field according to the ID of the document
	message.CreatedAt = message.ID.Time()
	err := c.Insert(message)

	if err != nil {
		return nil, errors.New("the message could not be created")
	}

	return message, nil
}
