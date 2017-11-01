package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"strings"

	mgo "gopkg.in/mgo.v2"
)

const dbName = "clagocerqueira"
const presidentsCollection = "presidents"
const councilmenCollection = "councilmen"
const personalitiesCollection = "personalities"
const authorsCollection = "authors"
const associationsCollection = "associations"
const pressCollection = "press"
const natureCollection = "nature"
const parishesCollection = "parishes"
const cityCouncilCollection = "city_council"

// Maps are reference types, which means they must be initialized, like
// pointers and slices
var parishesMap map[string]string = make(map[string]string)

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

func populateMap() {
	parishesMap["aboadela_sanche"] = "Aboadela, Sanche"
	parishesMap["aboim_vila_garcia"] = "Aboim e Vila Garcia"
	parishesMap["ansiaes"] = "Ansiães"
	parishesMap["bustelo_carvalho_rei"] = "Bustelo e Carvalho de Rei"
	parishesMap["canadelo_olo"] = "Canadelo e Ôlo"
	parishesMap["candemil"] = "Candemil"
	parishesMap["cepelos_gatao_sao_goncalo"] = "Cepelos, Gatão e São Gonçalo"
	parishesMap["figueiro_santa_cristina_santiago"] = "Figueiró, Santiago e Santa Cristina"
	parishesMap["fregim"] = "Fregim"
	parishesMap["freixo_baixo_cima"] = "Freido de Baixo e de Cima"
	parishesMap["fridao"] = "Fridão"
	parishesMap["gondar"] = "Gondar"
	parishesMap["gouveia"] = "Gouveia"
	parishesMap["jazente"] = "Jazente"
	parishesMap["lomba"] = "Lomba"
	parishesMap["louredo"] = "Louredo"
	parishesMap["lufrei"] = "Lufrei"
	parishesMap["mancelos"] = "Mancelos"
	parishesMap["oliveira"] = "Oliveira"
	parishesMap["padronelo"] = "Padronelo"
	parishesMap["real"] = "Real"
	parishesMap["rebordelo"] = "Rebordelo"
	parishesMap["salvador"] = "Salvador do Monte"
	parishesMap["teloes"] = "Telões"
	parishesMap["travanca"] = "Travanca"
	parishesMap["vila_caiz"] = "Vila Caíz"
	parishesMap["vila_cha_marao"] = "Vila Chã do Marão"
	parishesMap["vila_mea"] = "Vila Meã"
}

func findElement(list []string, value string) bool {
	for _, elem := range list {
		if elem == value {
			return true
		}
	}
	return false
}

func readMapAndInsertListOnDatabase(m map[string]string, s *mgo.Session, dbName string, collection string) {
	for k, v := range m {
		data := readGeneralFile(v, "/public/prod/images/monarquia.jpg", k)

		if !insertListOnDatabase(s, dbName, collection, data) {
			panic(fmt.Sprintf("[!] Data(%s) could not be inserted on the database!",
				k))
		} else {
			fmt.Println(fmt.Sprintf("[*] Data(%s) inserted with success!", k))
		}
	}
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

	m := make(map[string]string)
	m["journals"] = "press/jornais.csv"
	m["online"] = "press/online.csv"
	m["radios"] = "press/radios.csv"
	m["televisions"] = "press/televisao.csv"
	m["magazines"] = "press/revistas.csv"

	readMapAndInsertListOnDatabase(m, session, dbName, pressCollection)
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

	m := make(map[string]string)
	m["sports"] = "associations/assocDesportivas.csv"
	m["cultural"] = "associations/assocCulturais.csv"
	m["religious"] = "associations/assocReligiosas.csv"
	m["social"] = "associations/assocSociais.csv"
	m["civic"] = "associations/assocCivicas.csv"
	m["recreational"] = "associations/assocRecreativas.csv"

	readMapAndInsertListOnDatabase(m, session, dbName, associationsCollection)
}

func insertNatureOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	// Check if the nature collection already exists on the database
	natureExists := findElement(collectionNames, natureCollection)

	if natureExists {
		// Drop the collection if it already exists
		err := db.C(natureCollection).DropCollection()

		// Something went wrong while dropping the collection
		if err != nil {
			panic(err.Error())
		}
	}


	m := make(map[string]string)
	m["brooks"] = "nature/ribeiros.csv"
	m["rivers"] = "nature/rios.csv"
	m["mountains"] = "nature/serras.csv"

	readMapAndInsertListOnDatabase(m, session, dbName, natureCollection)
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
	councilmen = readGeneralFile("authors/autores1801_1900.csv",
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

	category_map := make(map[string]string)
	category_map["arts_writing"] = "personalities/artes_letras.csv"
	category_map["sports"] = "personalities/desporto.csv"
	category_map["social_economical"] = "personalities/social_economico.csv"
	category_map["political"] = "personalities/politico.csv"

	readMapAndInsertListOnDatabase(category_map, session, dbName, personalitiesCollection)
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

func insertCityCouncilOnDatabase(collectionNames []string, s *mgo.Session) {
	session := s.Copy()
	defer session.Close()

	db := session.DB(dbName)
	cityCouncilExist := findElement(collectionNames, cityCouncilCollection)

	if cityCouncilExist {
		err := db.C(cityCouncilCollection).DropCollection()

		if err != nil {
			panic(err.Error())
		}
	}

	var currentDate = "1976-2013"
	cityCouncilData := readGeneralFile("city_council/assembleiaMunicipal1976_2013.csv",
		"/public/prod/images/monarquia.jpg", currentDate)

	if !insertListOnDatabase(session, dbName, cityCouncilCollection, cityCouncilData) {
		panic(fmt.Sprintf("[!] City council on date %s could not be inserted!", currentDate))
	} else {
		fmt.Println(fmt.Sprintf("[*] City council on date %s inserted with success!", currentDate))
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

	// Populate the map of parishes
	populateMap()


	m := make(map[string]string)
	files, _ := ioutil.ReadDir("parishes/")
	for _, f := range files {
		// Make sure it isn't a directory...
		if !f.IsDir() {
			index := strings.Index(f.Name(), ".")
			filename := f.Name()[0:index]

			m[filename] = fmt.Sprintf("parishes/%s", f.Name())
		}
	}

	readMapAndInsertListOnDatabase(m, session, dbName, parishesCollection)
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
	var parishesFlag = flag.Bool("parishes", false, "inserts parishes on the database")
	var cityCouncilFlag = flag.Bool("cityCouncil", false, "inserts city council data on the database")
	var natureFlag = flag.Bool("nature", false, "inserts nature data on the database")

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

	if *natureFlag {
		insertNatureOnDatabase(collectionNames, session)
	}

	if *parishesFlag {
		insertParishesOnDatabase(collectionNames, session)
	}

	if *cityCouncilFlag {
		insertCityCouncilOnDatabase(collectionNames, session)
	}

	fmt.Println("[*] All tasks completed!")
}
