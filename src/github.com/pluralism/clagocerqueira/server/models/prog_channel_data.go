package models


type ProgChannelData struct {
	MessagesError chan error
	CreateMessage chan CreateMessageResult
}
