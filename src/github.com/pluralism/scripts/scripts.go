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
	"path/filepath"
	"io/ioutil"
)


const dbName = "clagocerqueira"
const presidentsCollection = "presidents"
const councilmenCollection = "councilmen"
const personalitiesCollection = "personalities"
const authorsCollection = "authors"
const associationsCollection = "associations"
const pressCollection = "press"
const riversCollection = "rivers"
const brooksCollection = "brooks"
const mountainsCollection = "mountains"
const parishesCollection = "parishes"


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
	Name    string            `bson:"name"`
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

func readGeneralFileToObject(filename, image string) GeneralObjectData {
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

func readGeneralFile(filename, image, date string) GeneralList {
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

		// Append the president to the general list
		generalData.ObjectsData = append(generalData.ObjectsData, GeneralObject{
			Name:        strings.TrimSpace(record[0]),
			Image:       image,
			Description: "",
		})
	}

	generalData.TotalItems = len(generalData.ObjectsData)

	presidentList := GeneralList{
		Name:    date,
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

func readFileAndInsertOnDatabase(currentName, collection, fileName, image string, session *mgo.Session) {
	data := readGeneralFile(fileName, image, currentName)

	if !insertListOnDatabase(session, dbName, collection, data) {
		panic(fmt.Sprintf("[!] Data with name %s could not be inserted!", currentName))
	} else {
		fmt.Println(fmt.Sprintf("[*] Data with name %s inserted with success!", currentName))
	}
}

func insertPressOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	pressExists := findElement(collectionNames, pressCollection)

	if pressExists {
		err := db.C(pressCollection).DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	readFileAndInsertOnDatabase("journals", pressCollection, "press/jornais.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("online_journals", pressCollection, "press/jornais_online.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("radios", pressCollection, "press/radios.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("online_radios", pressCollection, "press/radios_online.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("televisions", pressCollection, "press/televisao.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("magazines", pressCollection, "press/revistas.csv",
		"/public/prod/images/monarquia.jpg", session)
}

func insertAssociationsOnDatabase(collectionsNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the assocations collection already exists on the database
	associationsExists := findElement(collectionsNames, associationsCollection)

	if associationsExists {
		// Drop the collection if the collection already exists
		err := db.C(associationsCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}

	readFileAndInsertOnDatabase("sports", associationsCollection, "associations/assocDesportivas.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("cultural", associationsCollection, "associations/assocCulturais.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("religious", associationsCollection, "associations/assocReligiosas.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("social", associationsCollection, "associations/assocSociais.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("civic", associationsCollection, "associations/assocCivicas.csv",
		"/public/prod/images/monarquia.jpg", session)
	readFileAndInsertOnDatabase("recreational", associationsCollection, "associations/assocRecreativas.csv",
		"/public/prod/images/monarquia.jpg", session)
}

func insertCouncilmenOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the councilmen collection already exists on the database
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
	councilmen := readGeneralFile("councilmen/vereadores1836_1910.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1910-1926"
	councilmen = readGeneralFile("councilmen/vereadores1910_1926.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1926-1974"
	councilmen = readGeneralFile("councilmen/vereadores1926_1974.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1974-1976"
	councilmen = readGeneralFile("councilmen/vereadores1974_1976.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	currentDate = "1976-2013"
	councilmen = readGeneralFile("councilmen/vereadores1976_2013.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, councilmenCollection, councilmen) {
		panic(fmt.Sprintf("[!] Councilmen on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Councilmen on date %s inserted with success!", currentDate))
	}

	fmt.Println("[*] All councilmen were inserted with success!")
}

func insertAuthorsOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the collection already exists on the database
	authorsExist := findElement(collectionNames, authorsCollection)

	if authorsExist {
		// Drop the collection if it does exists
		err := db.C(authorsCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			// Run all defer functions, return to the caller, wait for all goroutines
			// to finish, and exit the application
			panic(err.Error())
		}
	}

	var currentDate = "1400-1500"
	councilmen := readGeneralFile("authors/autores1400_1500.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	currentDate = "1501-1600"
	councilmen = readGeneralFile("authors/autores1501_1600.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	currentDate = "1601-1700"
	councilmen = readGeneralFile("authors/autores1601_1700.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	currentDate = "1701-1800"
	councilmen = readGeneralFile("authors/autores1701_1800.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	currentDate = "1801-1900"
	councilmen = readGeneralFile("authors/autores1701_1800.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	currentDate = "1901-2000"
	councilmen = readGeneralFile("authors/autores1901_2000.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, authorsCollection, councilmen) {
		panic(fmt.Sprintf("[!] Authors on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] Authors on date %s inserted with success!", currentDate))
	}

	// Inform the user that all data was inserted with success!
	fmt.Println("[*] All authors were inserted with success!")
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

	personalities := readGeneralFileToObject("personalities/personalities.csv",
		"/public/prod/images/monarquia.jpg")

	if !insertListOnDatabase(session, dbName, personalitiesCollection, personalities) {
		panic("[!] Personalities could not be inserted on the database!")
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
		Name: "1976-2013",
		Objects: GeneralObjectData{
			ObjectsData: []GeneralObject{
				{
					Name:        "Amadeu Cerqueira da Silva",
					Image:       "/public/prod/images/amadeu_cerqueira_silva.jpg",
					Description: ""},
				{
					Name:        "Joaquim José Macedo Teixeira",
					Image:       "/public/prod/images/joaquim_teixeira.jpg",
					Description: ""},
				{
					Name:        "Francisco José Pereira de Assis Miranda",
					Image:       "/public/prod/images/francisco_assis.jpg",
					Description: ""},
				{
					Name:        "Armindo José da Cunha Abreu",
					Image:       "/public/prod/images/armindo_abreu.jpg",
					Description: ""},
				{
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

	presidents := readGeneralFile("presidents/presidentes1836_1910.csv",
		"/public/prod/images/monarquia.jpg", "1836-1910")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1836-1910 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1836-1910 inserted with success!")
	}

	presidents = readGeneralFile("presidents/presidentes1910_1926.csv",
		"/public/prod/images/monarquia.jpg", "1910-1926")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1910-1926 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1910-1926 inserted with success!")
	}

	presidents = readGeneralFile("presidents/presidentes1926_1974.csv",
		"/public/prod/images/monarquia.jpg", "1926-1974")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1926-1974 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1926-1974 inserted with success!")
	}

	presidents = readGeneralFile("presidents/presidents1974_1976.csv",
		"/public/prod/images/monarquia.jpg", "1974-1976")

	if !insertListOnDatabase(session, dbName, presidentsCollection, presidents) {
		panic("[!] Presidents on date 1974-1976 could not be inserted!")
	} else {
		fmt.Println("[*] Presidents on date 1974-1976 inserted with success!")
	}

	fmt.Println("[*] All presidents were inserted with success!")
}


func insertRiversOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the collection already exists on the database
	riversExist := findElement(collectionNames, riversCollection)

	if riversExist {
		// Drop the collection if it already exists on the database
		err := db.C(riversCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}

	rivers := readGeneralFileToObject("natural_patrimony/rios.csv",
		"/public/prod/images/monarquia.jpg")

	if !insertListOnDatabase(session, dbName, riversCollection, rivers) {
		panic("[!] Rivers could not be inserted on the database!")
	} else {
		fmt.Println("[*] Rivers inserted with success!")
	}
}


func insertBrooksOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	brooksExist := findElement(collectionNames, brooksCollection)

	if brooksExist {
		err := db.C(brooksCollection).DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	brooks := readGeneralFileToObject("natural_patrimony/ribeiros.csv",
		"/public/prod/images/monarquia.jpg")

	if !insertListOnDatabase(session, dbName, brooksCollection, brooks) {
		panic("[!] Brooks could not be inserted on the database!")
	} else {
		fmt.Println("[*] Brooks inserted with success!")
	}
}

func insertMountainsOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	mountainsExist := findElement(collectionNames, mountainsCollection)

	if mountainsExist {
		err := db.C(mountainsCollection).DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	mountains := readGeneralFileToObject("natural_patrimony/serras.csv",
	"/public/prod/images/monarquia.jpg")

	if !insertListOnDatabase(session, dbName, mountainsCollection, mountains) {
		panic("[!] Mountains could not be inserted on the database!")
	} else {
		fmt.Println("[*] Mountains inserted with success!")
	}
}


func insertParishesOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	parishesExist := findElement(collectionNames, parishesCollection)

	if parishesExist {
		err := db.C(parishesCollection).DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	files, _ := ioutil.ReadDir("parishes/")
	for _, f := range files {
		fmt.Println(f.IsDir())
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
	collectionNames, _ := session.DB(dbName).CollectionNames()

	/**
	 * Define the flags allowed in the command line here
	 * Each flag returns a pointer of type T, so we can access the value
	 * in the flag by doing *variable
	 */
	var presidentsFlag = flag.Bool("presidents", false, "inserts presidents on the database")
	var councilmenFlag = flag.Bool("councilmen", false, "inserts councilmen on the database")
	var personalitiesFlag = flag.Bool("personalities", false, "inserts personalities on the database")
	var authorsFlag = flag.Bool("authors", false, "inserts authors on the database")
	var associationsFlag = flag.Bool("associations", false, "inserts associations on the database")
	var pressFlag = flag.Bool("press", false, "inserts press on the database")
	var riversFlag = flag.Bool("rivers", false, "inserts the rivers on the database")
	var brooksFlag = flag.Bool("brooks", false, "inserts brooks on the database")
	var mountainsFlag = flag.Bool("mountains", false, "inserts mountains on the database")
	var parishesFlag = flag.Bool("parishes", false, "inserts parishes on the database")
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

	if *authorsFlag {
		insertAuthorsOnDatabase(collectionNames, session)
	}

	if *associationsFlag {
		insertAssociationsOnDatabase(collectionNames, session)
	}

	if *pressFlag {
		insertPressOnDatabase(collectionNames, session)
	}

	if *riversFlag {
		insertRiversOnDatabase(collectionNames, session)
	}

	if *brooksFlag {
		insertBrooksOnDatabase(collectionNames, session)
	}

	if *mountainsFlag {
		insertMountainsOnDatabase(collectionNames, session)
	}

	if *parishesFlag {
		insertParishesOnDatabase(collectionNames, session)
	}

	fmt.Println("[*] Completed!")
}
