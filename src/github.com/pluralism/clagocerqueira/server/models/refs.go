package models

import (
	"context"

	mgo "gopkg.in/mgo.v2"
	"gopkg.in/olivere/elastic.v5"
)

var Session *mgo.Session
var Channels = ProgChannelData{
	CreateMessage: make(chan CreateMessageResult),
	MessagesError: make(chan error)}
var Context context.Context
var Elastic *elastic.Client