package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"wisnuprsj.com/study/note"
)

// type str string

// func (text str) log() {
// 	fmt.Println(text)
// }

// func main() {
// 	var name str
// 	name = "Wisnu"
// 	name.log()
// }

func main() {
	title, content := getNoteData()

	userNote, err := note.New(title, content)

	if err != nil {
		fmt.Println(err)
		return
	}

	userNote.Display()

	err = userNote.Save()

	if err != nil {
		fmt.Println("Saving the note failed")
		return
	}

	fmt.Println("Saving the note succeeded!")
}

func getNoteData() (string, string) {
	title := getUserInput("Note title:")
	content := getUserInput("Note content:")
	return title, content
}

func getUserInput(prompt string) string {
	fmt.Printf("%v ", prompt)
	// var value string
	// fmt.Scanln(&value)

	// longer text input
	reader := bufio.NewReader(os.Stdin)
	text, err := reader.ReadString('\n') // don't use double quotes

	if err != nil {
		return ""
	}

	text = strings.TrimSuffix(text, "\n")
	text = strings.TrimSuffix(text, "\r")

	return text
}
