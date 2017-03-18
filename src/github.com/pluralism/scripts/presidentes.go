package main

import (
	"fmt"

	mgo "gopkg.in/mgo.v2"
)

// Presidente is the basic struct to insert a president in the database
type Presidente struct {
	Nome      string
	Imagem    string
	Descricao string
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
	presidentesExist := findElement(collections, "presidentes")

	if presidentesExist {
		// Drop the collection if it does not exist
		err = db.C("presidentes").DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	presidentesMap := make(map[string][]Presidente)

	presidentesMap["1976-2013"] = []Presidente{
		Presidente{
			Nome:      "Amadeu Cerqueira da Silva",
			Imagem:    "/img/site/presidentes/1976_2013/amadeu_cerqueira_silva.jpg",
			Descricao: ""},
		Presidente{
			Nome:      "Joaquim José Macedo Teixeira",
			Imagem:    "/img/site/presidentes/1976_2013/joaquim_teixeira.jpg",
			Descricao: ""},
		Presidente{
			Nome:      "Francisco José Pereira de Assis Miranda",
			Imagem:    "/img/site/presidentes/1976_2013/francisco_assis.jpg",
			Descricao: ""},
		Presidente{Nome: "Armindo José da Cunha Abreu",
			Imagem:    "/img/site/presidentes/1976_2013/armindo_abreu.jpg",
			Descricao: ""},
		Presidente{
			Nome:      "José Luís Gaspar Jorge",
			Imagem:    "/img/site/presidentes/1976_2013/jose_jorge.jpg",
			Descricao: ""},
	}

	err = db.C("presidentes").Insert(presidentesMap)

	if err != nil {
		panic(err.Error())
	} else {
		fmt.Println("[*] Presidentes inseridos na base de dados...")
	}
}
