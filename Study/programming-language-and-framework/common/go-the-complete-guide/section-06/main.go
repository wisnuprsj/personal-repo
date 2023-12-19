package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"wisnuprsj.com/study/note"
	"wisnuprsj.com/study/todo"
)

type Saver interface {
	Save() error
}

// type displayer interface {
// 	Display()
// }

type outputtable interface {
	Saver
	Display()
}

// type outputtable interface {
// 	Save() error
// 	Display()
// }

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
	printSomething(1)
	printSomething(1.5)
	printSomething("Hello")
	title, content := getNoteData()
	todoText := getTodoData()

	todo, err := todo.New(todoText)

	printSomething(todo)

	if err != nil {
		fmt.Println(err)
		return
	}

	userNote, err := note.New(title, content)

	if err != nil {
		fmt.Println(err)
		return
	}

	err = outputData(todo)
	if err != nil {
		return
	}

	err = outputData(userNote)
	if err != nil {
		return
	}
}

// can refer to any kind value, like 'any' type in TypeScript
func printSomething(value interface{}) {
	// type conversion
	typedVal, ok := value.(int)

	if ok {
		// typedVal + 1
		fmt.Println("Integer:", typedVal)
		return
	}

	switch value.(type) {
	case int: 
		//...
		fmt.Println("Integer:", value)
	case float64:
		fmt.Println("Float:", value)
	case string:
		fmt.Println(value)
	}
}

func getTodoData() string {
	return getUserInput("Todo text: ")
}

func outputData(data outputtable) error {
	data.Display()
	return saveData(data)
}

func saveData(data Saver) error {
	err := data.Save()

	if err != nil {
		fmt.Println("Saving the note failed")
		return err
	}

	fmt.Println("Saving the note succeeded!")
	return nil
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

// square brackets using 'T' are generics
func add[T int|float64|string](a, b T) T {
	return a + b
}