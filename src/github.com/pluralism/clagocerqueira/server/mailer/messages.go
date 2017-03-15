package mailer

import (
	"bytes"
	"html/template"
	"net/smtp"
	"os"
	"sync"

	"github.com/pluralism/clagocerqueira/server/models"
	"github.com/pluralism/clagocerqueira/server/refs"
)

func SendContactEmail(message *models.Message, wg *sync.WaitGroup) {
	const emailTemplate = `
  Mensagem recebida de: {{.Name}}({{.Email}})
  Número de telemóvel: {{.Phone}}
  Assunto: {{.Subject}}
  Conteúdo da mensagem:

  {{.Content}}
  `
	var buffer bytes.Buffer

	template := template.New("emailTemplate")
	template, err := template.Parse(emailTemplate)

	if err != nil {
		sendEmailResult(wg, err)
	}

	err = template.Execute(&buffer, message)

	if err != nil {
		sendEmailResult(wg, err)
	}

	// Send the email
	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", "andrepdpinheiro@gmail.com", os.Getenv("EMAIL_PASSWORD"), "smtp.gmail.com"),
		"andrepdpinheiro@gmail.com",
		[]string{"andrepdpinheiro@gmail.com"},
		buffer.Bytes())

	if err != nil {
		sendEmailResult(wg, err)
	} else {
		// No errors returned, return success
		sendEmailResult(wg, nil)
	}
	return
}

func sendEmailResult(wg *sync.WaitGroup, err error) {
	wg.Done()
	refs.MessagesChannel <- err
}
