package models

type GeneralObjectData struct {
	Objects    []GeneralPersonElem `bson:"objects_data"`
	TotalItems int                 `bson:"total_items"`
}
