package models

// GenericPersonElem is the data that is common to most fields related with people
type GenericPersonElem struct {
	Name        string `json:"name" bson:"name"`
	Image       string `json:"image" bson:"image"`
	Description string `json:"descrition" bson:"description"`
}
