package models

import "time"

/*
Message represents a message that a user is able to send in the
contact form.
*/
type Message struct {
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Phone     string    `json:"phone"`
	Subject   string    `json:"subject"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
