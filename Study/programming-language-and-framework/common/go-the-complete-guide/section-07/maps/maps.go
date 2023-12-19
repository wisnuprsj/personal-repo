package maps

import "fmt"

type Product struct {
	id string
	title string
	price float64
}



func main() {
	// websites := []string{"https://google.com", "https://aws.com"}
	websites := map[string]string{ // [key]value
		"Google":              "https://google.com",
		"Amazon Web Services": "https://aws.com",
	}

	fmt.Println(websites)
	fmt.Println(websites["Amazon Web Services"])
	websites["LinkedIn"]="https://linkedin.com"
	fmt.Println(websites)

	delete(websites, "LinkedIn")
	fmt.Println(websites)
}