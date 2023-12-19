package main

import "fmt"

type floatMap map[string]float64

func (m floatMap) output() {
	fmt.Println(m)
}

func main() {
	// first argument are the type, second argument are the length, 
	// third argument are the capacity allocation memory reserve
	// userNames := []string{} this will always create new copy whenever new item is added
	userNames := make([]string, 2, 5)
	fmt.Println(len(userNames))

	userNames[0] = "Julie"
	userNames[1] = "Wisnu"

	userNames = append(userNames, "Max")
	userNames = append(userNames, "Manuel")

	fmt.Println(userNames)

	// courseRatings := map[string]float64{}
	// courseRatings := make(map[string]float64, 3) // second argument only
	courseRatings := make(floatMap, 3)

	courseRatings["go"] = 4.7
	courseRatings["react"] = 4.8
	courseRatings["angular"] = 4.7
	courseRatings["node"] = 5.0

	courseRatings.output()

	// fmt.Println(courseRatings)

	for index, value := range userNames {
		fmt.Println(index, value)
	}

	for range userNames {
		// fmt.Println()
	}

	for key, value := range courseRatings {
		fmt.Println(key, value)
	}

}