package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"os"
	"strings"

	mgo "gopkg.in/mgo.v2"
)

const dbName = "clagocerqueira"
const presidentsCollection = "presidents"
const councilmenCollection = "councilmen"
const personalitiesCollection = "personalities"

type GeneralObject struct {
	Name        string `bson:"name"`
	Image       string `bson:"image"`
	Description string `bson:"description"`
}

type GeneralObjectData struct {
	ObjectsData []GeneralObject `bson:"objects_data"`
	TotalItems  int             `bson:"total_items"`
}

type GeneralList struct {
	Date    string            `bson:"date"`
	Objects GeneralObjectData `bson:"objects"`
}

func findElement(list []string, value string) bool {
	for _, elem := range list {
		if elem == value {
			return true
		}
	}
	return false
}

func readGeneralFileToObject(session *mgo.Session, filename, image string) GeneralObjectData {
	f, err := os.Open(filename)
	var generalObjectData GeneralObjectData

	if err != nil {
		panic(err.Error())
	}

	reader := csv.NewReader(bufio.NewReader(f))
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}

		generalObjectData.ObjectsData = append(generalObjectData.ObjectsData, GeneralObject{
			Name:        strings.TrimSpace(record[0]),
			Image:       image,
			Description: "",
		})
	}
	generalObjectData.TotalItems = len(generalObjectData.ObjectsData)

	return generalObjectData
}

func readGeneralFile(session *mgo.Session, filename, image, date string) GeneralList {
	f, err := os.Open(filename)
	var generalData GeneralObjectData

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
		generalData.ObjectsData = append(generalData.ObjectsData, GeneralObject{
			Name:        strings.TrimSpace(record[0]),
			Image:       image,
			Description: "",
		})
	}

	generalData.TotalItems = len(generalData.ObjectsData)

	presidentList := GeneralList{
		Date:    date,
		Objects: generalData,
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

	var currentDate = "1836-1910"
	councilmen := readGeneralFile(session, "councilmen/vereadores1836_1910.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1910-1926"
	councilmen = readGeneralFile(session, "councilmen/vereadores1910_1926.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1926-1974"
	councilmen = readGeneralFile(session, "councilmen/vereadores1926_1974.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1974-1976"
	councilmen = readGeneralFile(session, "councilmen/vereadores1974_1976.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1976-2013"
	councilmen = readGeneralFile(session, "councilmen/vereadores1976_2013.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	fmt.Println("[*] All councilmen were inserted with success!")
}

func insertPersonalitiesOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the collection already exists on the database
	personalitiesExist := findElement(collectionNames, personalitiesCollection)

	if personalitiesExist {
		// Drop the collection if it does exists
		err := db.C(personalitiesCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}

	personalities := readGeneralFileToObject(session, "personalities/personalities.csv",
		"/public/prod/images/monarquia.jpg")

	if !insertListOnDatabase(session, dbName, personalitiesCollection, personalities) {
		panic("[!] Personalities could not be inserted in the database!")
	} else {
		fmt.Println("[*] Personalities inserted with success!")
	}
}

func insertPresidentsOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the collection already exists on the database
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
		Objects: GeneralObjectData{
			ObjectsData: []GeneralObject{
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
			TotalItems: 5,
		},
	}

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidentList) {
		panic("[!] Presidents on date 1976-2013 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1976-2013 inserted with success!")
	}

	presidents := readGeneralFile(session, "presidents/presidentes1836_1910.csv",
		"/public/prod/images/monarquia.jpg", "1836-1910")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1836-1910 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1836-1910 inserted with success!")
	}

	presidents = readGeneralFile(session, "presidents/presidentes1910_1926.csv",
		"/public/prod/images/monarquia.jpg", "1910-1926")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1910-1926 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1910-1926 inserted with success!")
	}

	presidents = readGeneralFile(session, "presidents/presidentes1926_1974.csv",
		"/public/prod/images/monarquia.jpg", "1926-1974")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1926-1974 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1926-1974 inserted with success!")
	}

	presidents = readGeneralFile(session, "presidents/presidents1974_1976.csv",
		"/public/prod/images/monarquia.jpg", "1974-1976")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1974-1976 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1974-1976 inserted with success!")
	}

	fmt.Println("[*] All presidents were inserted with success!")
}

func main() {
	session, err := mgo.Dial("mongodb://localhost")
	// Make sure that the connection is closed at the end
	defer session.Close()

	if err != nil {
		panic(err.Error())
	}
	session.SetMode(mgo.Monotonic, true)
	collectionNames, _ := session.DB(dbName).CollectionNames()

	/**
	 * Define the flags allowed in the command line here
	 * Each flag returns a pointer of type T, so we can access the value
	 * in the flag by doing *variable
	 */
	var presidentsFlag = flag.Bool("presidents", false, "inserts presidents on the database")
	var councilmenFlag = flag.Bool("councilmen", false, "inserts councilmen on the database")
	var personalitiesFlag = flag.Bool("personalities", false, "inserts personalities on the database")
	// Parse the flags
	flag.Parse()

	if *presidentsFlag {
		insertPresidentsOnDatabase(collectionNames, session)
	}

	if *councilmenFlag {
		insertCouncilmenOnDatabase(collectionNames, session)
	}

	if *personalitiesFlag {
		insertPersonalitiesOnDatabase(collectionNames, session)
	}

	fmt.Println("[*] Completed!")
}
