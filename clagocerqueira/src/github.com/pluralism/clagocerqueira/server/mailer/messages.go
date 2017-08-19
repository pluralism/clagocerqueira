package mailer

import (
	"bytes"
	"html/template"
	"net/smtp"
	"os"
	"github.com/pluralism/clagocerqueira/server/models"
)


func sendEmailResult(err error) {
	models.Channels.MessagesError <- err
}


func SendContactEmail(message *models.Message) {
	const mime = "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	const emailTemplate = `
		<html>
			<body>
				<strong>Mensagem recebida de</strong>: {{.Name}}({{.Email}})
				<br />
  				<strong>Número de telemóvel</strong>: {{.Phone}}
  				<br />
  				<strong>Assunto</strong>: {{.Subject}}
  				<br />
  				<strong>Conteúdo da mensagem</strong>:

  				<p>{{.Content}}</p>
			</body>
		</html>
  	`
	var body bytes.Buffer
	var bodyStr string

	template := template.New("emailTemplate")
	template, err := template.Parse(emailTemplate)

	if err != nil {
		sendEmailResult(err)
	}

	err = template.Execute(&body, message)

	if err != nil {
		sendEmailResult(err)
	}

	// Convert the response body to string
	bodyStr = body.String()
	result := []byte(mime + "\n" + bodyStr)

	// Send the email
	err = smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("",
			"info@clagocerqueira.pt",
			os.Getenv("EMAIL_PASSWORD"),
			"smtp.gmail.com"),
		"info@clagocerqueira.pt",
		[]string{"info@clagocerqueira.pt"},
		result)


	if err != nil {
		// Sent the error result to the channel
		sendEmailResult(err)
	} else {
		// No errors returned, return success
		sendEmailResult(nil)
	}
	return
}