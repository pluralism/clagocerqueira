package models

import (
	mgo "gopkg.in/mgo.v2"
)

var Session *mgo.Session
var Channels = ProgChannelData{
	CreateMessage: make(chan CreateMessageResult),
	MessagesError: make(chan error)}