package types

import (
	"fmt"
	"regexp"

	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
)

var Email = graphql.NewScalar(graphql.ScalarConfig{
	Name: "Email",
	Description: "The `Email` scalar type represents an e-mail in the RFC 5322 format." +
		"The regex that is used should work in any case.",
	Serialize:  coerceEmail,
	ParseValue: coerceEmail,
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue:
			emailRegex := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

			// Invalid email, just return nil
			if !emailRegex.MatchString(valueAST.Value) {
				return nil
			}

			return valueAST.Value
		}

		// Return nil if the type is not string
		return nil
	},
})

func coerceEmail(value interface{}) interface{} {
	return fmt.Sprintf("%v", value)
}
