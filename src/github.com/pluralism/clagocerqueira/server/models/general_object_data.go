package models

type GeneralObjectData struct {
	Objects    []GeneralPersonElem `json:"objects_data" bson:"objects_data"`
	TotalItems int                 `json:"total_items" bson:"total_items"`
	MaxPages   int                 `json:"max_pages"`
}
