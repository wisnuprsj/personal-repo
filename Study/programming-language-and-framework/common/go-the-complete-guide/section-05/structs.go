package main

import (
	"fmt"

	"wisnuprsj.com/study/user"
)

func main() {
	firstName := getUserData("Please enter your first name: ")
	lastName := getUserData("Please enter your last name: ")
	birthdate := getUserData("Please enter your birthdate (MM/DD/YYYY): ")

	createdUser, err := user.New(firstName, lastName, birthdate)

	if err != nil {
		fmt.Print(err)
		return
	}

	admin := user.NewAdmin("wisnuprsj@example.com", "test123")

	admin.OutputUserDetails()
	admin.ClearUserName()
	admin.OutputUserDetails()

	// outputUserDetails(&createdUser)
	createdUser.OutputUserDetails()
	createdUser.ClearUserName()
	createdUser.OutputUserDetails()

}

// func outputUserDetails(u *user) {
// 	// ...
// 	// (*u).firstName --> the correct way to access field on a pointer
// 	fmt.Println(u.firstName, u.lastName, u.birthDate, u.createdAt)
// }

func getUserData(promptText string) string {
	fmt.Print(promptText)
	var value string
	fmt.Scanln(&value)
	return value
}
