package controllers

import (
	"errors"
	"fmt"
	"sync"

	"github.com/pluralism/clagocerqueira/server/models"
	"github.com/pluralism/clagocerqueira/server/refs"
	"github.com/pluralism/clagocerqueira/server/types"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AddMessage(s *mgo.Session, message *models.Message, wg *sync.WaitGroup) {
	fmt.Println("a enviar nova mensagem")
	session := s.Copy()
	defer session.Close()

	c := session.DB("clagocerqueira").C("messages")

	// Assign an ID to the message
	message.ID = bson.NewObjectId()

	if !message.ID.Valid() {
		sendAddMessageRes(errors.New("the ID is invalid"), message, wg)
	}

	// Update the CreatedAt field according to the ID of the document
	message.CreatedAt = message.ID.Time()
	err := c.Insert(message)

	if err != nil {
		sendAddMessageRes(errors.New("the message could not be created"), message, wg)
	} else {
		sendAddMessageRes(nil, message, wg)
	}
	return
}

func sendAddMessageRes(err error, message *models.Message, wg *sync.WaitGroup) {
	res := types.CreateMessageResult{
		Error:   err,
		Message: message,
	}
	wg.Done()
	refs.CreateMessageChannel <- res
}
