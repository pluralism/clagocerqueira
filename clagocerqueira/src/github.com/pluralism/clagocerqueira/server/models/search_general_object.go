package models


type SearchGeneralObject struct {
	ID string `json:"id"`
	Index string `json:"_index"`
	Type string `json:"_type"`
	Name string `json:"name"`
	Object SearchObject `json:"objects"`
}



type SearchObject struct {
	ObjectData SearchObjectData `json:"objects_data"`
	TotalItems int `json:"total_items"`
}


type SearchObjectData struct {
	Name        string `json:"name"`
	Image       string `json:"image"`
	Description string `json:"descrition"`
	Extra 	    string `json:"extra"`
}