package main

import (
	"fmt"

	mgo "gopkg.in/mgo.v2"
)

// President is the basic struct to insert a president in the database
type President struct {
	Name        string
	Image       string
	Description string
}

type PresidentList struct {
	Date    string
	Objects []President
}

func findElement(list []string, value string) bool {
	for _, elem := range list {
		if elem == value {
			return true
		}
	}

	return false
}

func main() {
	session, err := mgo.Dial("mongodb://localhost")

	if err != nil {
		panic(err.Error())
	}

	// Make sure that the connection is closed at the end
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	db := session.DB("clagocerqueira")
	collections, err := db.CollectionNames()

	if err != nil {
		panic(err.Error())
	}

	// Check if the collection already exists in the database
	presidentsExist := findElement(collections, "presidents")

	if presidentsExist {
		// Drop the collection if it does not exist
		err = db.C("presidents").DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	presidentList := PresidentList{
		Date: "1976-2013",
		Objects: []President{
			President{
				Name:        "Amadeu Cerqueira da Silva",
				Image:       "/img/site/presidents/1976_2013/amadeu_cerqueira_silva.jpg",
				Description: ""},
			President{
				Name:        "Joaquim José Macedo Teixeira",
				Image:       "/img/site/presidents/1976_2013/joaquim_teixeira.jpg",
				Description: ""},
			President{
				Name:        "Francisco José Pereira de Assis Miranda",
				Image:       "/img/site/presidents/1976_2013/francisco_assis.jpg",
				Description: ""},
			President{
				Name:        "Armindo José da Cunha Abreu",
				Image:       "/img/site/presidents/1976_2013/armindo_abreu.jpg",
				Description: ""},
			President{
				Name:        "José Luís Gaspar Jorge",
				Image:       "/img/site/presidents/1976_2013/jose_jorge.jpg",
				Description: ""},
		},
	}

	err = db.C("presidents").Insert(presidentList)

	if err != nil {
		panic(err.Error())
	} else {
		fmt.Println("[*] Presidents created with success...")
	}
}
