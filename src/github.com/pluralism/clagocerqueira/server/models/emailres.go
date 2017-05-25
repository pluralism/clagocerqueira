package models


type CreateMessageResult struct {
	Error   error
	Message *Message
}