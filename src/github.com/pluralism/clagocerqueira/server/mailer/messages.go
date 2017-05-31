package mailer

import (
	"bytes"
	"html/template"
	"net/smtp"
	"os"
	"github.com/pluralism/clagocerqueira/server/models"
)


func SendContactEmail(message *models.Message) {
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
		sendEmailResult(err)
	}

	err = template.Execute(&buffer, message)

	if err != nil {
		sendEmailResult(err)
	}

	// Send the email
	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("",
			"andrepdpinheiro@gmail.com",
			os.Getenv("EMAIL_PASSWORD"),
			"smtp.gmail.com"),
		"andrepdpinheiro@gmail.com",
		[]string{"andrepdpinheiro@gmail.com"},
		buffer.Bytes())

	if err != nil {
		sendEmailResult(err)
	} else {
		// No errors returned, return success
		sendEmailResult(nil)
	}
	return
}


func sendEmailResult(err error) {
	models.Channels.MessagesError <- err
}
