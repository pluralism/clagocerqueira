package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"math"
	"os"
	"strings"

	mgo "gopkg.in/mgo.v2"
)

const dbName = "clagocerqueira"
const presidentsCollection = "presidents"
const councilmenCollection = "councilmen"

type GeneralObject struct {
	Name        string
	Image       string
	Description string
}

type GeneralList struct {
	Date       string          `bson:"date"`
	Objects    []GeneralObject `bson:"objects"`
	TotalPages int             `bson:"total_pages"`
}

func findElement(list []string, value string) bool {
	for _, elem := range list {
		if elem == value {
			return true
		}
	}
	return false
}

func readPresidentsGeneralFile(session *mgo.Session, filename string, image string, date string) GeneralList {
	f, err := os.Open(filename)
	var presidentNames []GeneralObject

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
		presidentNames = append(presidentNames, GeneralObject{
			Name:        strings.TrimSpace(record[0]),
			Image:       image,
			Description: "",
		})
	}

	totalPages := int(math.Ceil(float64(len(presidentNames)) / 10))

	presidentList := GeneralList{
		Date:       date,
		Objects:    presidentNames,
		TotalPages: totalPages,
	}

	return presidentList
}

func insertListOnDatabase(s *mgo.Session, db string, collection string, data interface{}) bool {
	session := s.Copy()
	defer session.Close()

	err := session.DB(db).C(collection).Insert(data)

	if err != nil {
		// Show the error to the user
		panic(err.Error())
	}
	return true
}

func insertCouncilmenOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the councilmen collection already exists in the database
	councilmenExists := findElement(collectionNames, councilmenCollection)

	if councilmenExists {
		// Drop the collection if it does exists
		err := db.C(councilmenCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}
}

func insertPresidentsOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the collection already exists in the database
	presidentsExist := findElement(collectionNames, presidentsCollection)

	if presidentsExist {
		// Drop the collection if it does exists
		err := db.C(presidentsCollection).DropCollection()

		// Oh oh, something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}

	presidentList := GeneralList{
		Date: "1976-2013",
		Objects: []GeneralObject{
			GeneralObject{
				Name:        "Amadeu Cerqueira da Silva",
				Image:       "/public/prod/images/amadeu_cerqueira_silva.jpg",
				Description: ""},
			GeneralObject{
				Name:        "Joaquim José Macedo Teixeira",
				Image:       "/public/prod/images/joaquim_teixeira.jpg",
				Description: ""},
			GeneralObject{
				Name:        "Francisco José Pereira de Assis Miranda",
				Image:       "/public/prod/images/francisco_assis.jpg",
				Description: ""},
			GeneralObject{
				Name:        "Armindo José da Cunha Abreu",
				Image:       "/public/prod/images/armindo_abreu.jpg",
				Description: ""},
			GeneralObject{
				Name:        "José Luís Gaspar Jorge",
				Image:       "/public/prod/images/jose_jorge.jpg",
				Description: ""},
		},
	}

	presidentList.TotalPages = int(math.Ceil(float64(len(presidentList.Objects)) / 10))

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
}

func main() {
	session, err := mgo.Dial("mongodb://localhost")
	// Make sure that the connection is closed at the end
	defer session.Close()

	if err != nil {
		panic(err.Error())
	}
	session.SetMode(mgo.Monotonic, true)

	/**
	 * Define the flags allowed in the command line here
	 * Each flag returns a pointer of type T, so we can access the value
	 * in the flag by doing *variable
	 */
	var presidentsFlag = flag.Bool("presidents", false, "inserts presidents on the database")
	var councilmenFlag = flag.Bool("councilmen", false, "inserts councilmen on the database")
	// Parse the flags
	flag.Parse()

	fmt.Printf("[*] Insert presidents: %t\n", *presidentsFlag)
	fmt.Printf("[*] Insert councilmen: %t\n", *councilmenFlag)

	fmt.Println("[*] Completed!")
}
