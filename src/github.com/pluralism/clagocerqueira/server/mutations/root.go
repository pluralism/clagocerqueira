package mutations

import (
	"sync"

	"github.com/graphql-go/graphql"
	"github.com/pluralism/clagocerqueira/server/mailer"
	"github.com/pluralism/clagocerqueira/server/models"
	"github.com/pluralism/clagocerqueira/server/types"
)

var RootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "CLagoCerqueiraRootMutation",
	Fields: graphql.Fields{
		"createMessage": &graphql.Field{
			Type:        types.MessageType,
			Description: "Create a new message",
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"phone": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"email": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(types.Email),
				},
				"content": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
				"subject": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				name, _ := params.Args["name"].(string)
				phone, _ := params.Args["phone"].(string)
				email, _ := params.Args["email"].(string)
				subject, _ := params.Args["subject"].(string)
				content, _ := params.Args["content"].(string)

				newMessage := &models.Message{
					Name:    name,
					Phone:   phone,
					Email:   email,
					Subject: subject,
					Content: content,
				}
				var wg sync.WaitGroup
				wg.Add(1)
				// Try to send the email
				go mailer.SendContactEmail(newMessage, &wg)
				wg.Add(1)
				// Save the message in the database while sending the email
				go models.AddMessage(models.Session, newMessage, &wg)
				wg.Wait()

				// Wait for the result from the channel here
				resultMessage := <-models.Channels.MessagesError
				resultMessageCreate := <-models.Channels.CreateMessage

				// Return the error if something goes wrong...
				if resultMessage != nil {
					return nil, resultMessage
				}

				if resultMessageCreate.Error != nil {
					return nil, resultMessageCreate.Error
				}

				// Success, everything went fine!
				return resultMessageCreate.Message, nil
			},
		},
	},
})
