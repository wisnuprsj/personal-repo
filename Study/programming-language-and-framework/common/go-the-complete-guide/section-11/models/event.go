package models

import (
	"time"

	"wisnuprsj.com/study/rest-api/db"
)

type Event struct {
	ID          int64    		`json:"id"`
	Name        string 		`json:"name" binding:"required"`
	Description string 		`json:"description" binding:"required"`
	Location    string 		`json:"location" binding:"required"`
	DateTime    time.Time 	`json:"dateTime" binding:"required"`
	UserID		int64 		`json:"userId"`
}

var events = []Event{}

func (event *Event) Save() error {
	// later: add it to a database
	query := `
	INSERT INTO events (name, description, location, dateTime, user_id) 
	VALUES (?,?,?,?,?)
	`
	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	result, err := stmt.Exec(event.Name, event.Description, event.Location, event.DateTime, event.UserID)

	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	event.ID = id
	return err
}

func GetEventById(id int64) (*Event, error) {
	query := `SELECT * FROM events WHERE id = ?`

	row := db.DB.QueryRow(query, id)
	var event Event 
	err := row.Scan(&event.ID, &event.Name, &event.Description, &event.Location, &event.DateTime, &event.UserID)

	if err != nil {
		return nil, err
	}

	return &event, nil
}

func GetAllEvents() ([]Event, error)  {
	query := "SELECT * FROM events"

	rows, err := db.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var events []Event

	for rows.Next() {
		var event Event
		err := rows.Scan(&event.ID, &event.Name, &event.Description, &event.Location, &event.DateTime, &event.UserID)

		if err != nil {
			return nil, err
		}

		events = append(events, event)
	}

	return events, nil
}

func (e *Event) Update() error {
	query := `
		UPDATE events 
		SET name = ?, description = ?, location = ?, dateTime = ?
		WHERE id = ?
	`

	stmt, err := db.DB.Prepare(query)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(e.Name, e.Description, e.Location, e.DateTime, e.ID)

	return err

}

func (e *Event) Delete() error {
	query := `
		DELETE FROM events WHERE id = ?
	`

	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(e.ID)

	return err
}