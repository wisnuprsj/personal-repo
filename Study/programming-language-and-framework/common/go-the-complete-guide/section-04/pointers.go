package main

import "fmt"

func main() {
	age := 32 // regular variable

	// agePointer := &age
	var agePointer *int
	agePointer = &age

	fmt.Println("Age:", *agePointer)

	adultYears := getAdultYears(agePointer)
	fmt.Println(adultYears)
	fmt.Println("Age:", age)
}

func getAdultYears(age *int) int {
	*age -= 18
	return *age
}

