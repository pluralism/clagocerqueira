package types

import "github.com/pluralism/clagocerqueira/server/models"

type CreateMessageResult struct {
	Error   error
	Message *models.Message
}
