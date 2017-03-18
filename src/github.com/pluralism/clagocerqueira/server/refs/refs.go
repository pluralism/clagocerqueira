package refs

import (
	"github.com/pluralism/clagocerqueira/server/types"
	mgo "gopkg.in/mgo.v2"
)

var Session *mgo.Session

// Both channels are unbuffered
var MessagesChannel = make(chan error)
var CreateMessageChannel = make(chan types.CreateMessageResult)
