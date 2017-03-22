package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strings"

	mgo "gopkg.in/mgo.v2"
)

const dbName = "clagocerqueira"
const presidentsCollection = "presidents"

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

func readPresidentsGeneralFile(session *mgo.Session, filename string, image string, date string) PresidentList {
	f, err := os.Open(filename)
	var presidentNames []President

	if err != nil {
		panic(err.Error())
	}

	reader := csv.NewReader(bufio.NewReader(f))
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}

		// Append the president to the list of presidents
		presidentNames = append(presidentNames, President{
			Name:        strings.TrimSpace(record[0]),
			Image:       image,
			Description: "",
		})
	}

	presidentList := PresidentList{
		Date:    date,
		Objects: presidentNames,
	}

	return presidentList
}

func insertListOnDatabase(session *mgo.Session, db string, collection string, data interface{}) bool {
	err := session.DB(db).C(collection).Insert(data)

	if err != nil {
		// Show the error to the user
		panic(err.Error())
	}
	return true
}

func main() {
	session, err := mgo.Dial("mongodb://localhost")

	if err != nil {
		panic(err.Error())
	}

	// Make sure that the connection is closed at the end
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	db := session.DB(dbName)
	collections, err := db.CollectionNames()

	if err != nil {
		panic(err.Error())
	}

	// Check if the collection already exists in the database
	presidentsExist := findElement(collections, presidentsCollection)

	if presidentsExist {
		// Drop the collection if it does exists
		err = db.C(presidentsCollection).DropCollection()

		// Oh oh, something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}

	presidentList := PresidentList{
		Date: "1976-2013",
		Objects: []President{
			President{
				Name:        "Amadeu Cerqueira da Silva",
				Image:       "/public/prod/images/amadeu_cerqueira_silva.jpg",
				Description: ""},
			President{
				Name:        "Joaquim José Macedo Teixeira",
				Image:       "/public/prod/images/joaquim_teixeira.jpg",
				Description: ""},
			President{
				Name:        "Francisco José Pereira de Assis Miranda",
				Image:       "/public/prod/images/francisco_assis.jpg",
				Description: ""},
			President{
				Name:        "Armindo José da Cunha Abreu",
				Image:       "/public/prod/images/armindo_abreu.jpg",
				Description: ""},
			President{
				Name:        "José Luís Gaspar Jorge",
				Image:       "/public/prod/images/jose_jorge.jpg",
				Description: ""},
		},
	}

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidentList) {
		panic("[!] Presidents on date 1976-2013 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1976-2013 inserted with success!")
	}

	presidents := readPresidentsGeneralFile(session, "presidents/presidentes1836_1910.csv",
		"/public/prod/images/monarquia.jpg", "1836-1910")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1836-1910 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1836-1910 inserted with success!")
	}

	presidents = readPresidentsGeneralFile(session, "presidents/presidentes1910_1926.csv",
		"/public/prod/images/monarquia.jpg", "1910-1926")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1910-1926 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1910-1926 inserted with success!")
	}

	presidents = readPresidentsGeneralFile(session, "presidents/presidentes1926_1974.csv",
		"/public/prod/images/monarquia.jpg", "1926-1974")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1926-1974 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1926-1974 inserted with success!")
	}

	presidents = readPresidentsGeneralFile(session, "presidents/presidents1974_1976.csv",
		"/public/prod/images/monarquia.jpg", "1974-1976")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1974-1976 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1974-1976 inserted with success!")
	}

	fmt.Println("[*] Completed!")
}
