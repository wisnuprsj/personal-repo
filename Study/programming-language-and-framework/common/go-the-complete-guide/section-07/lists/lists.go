package lists

import "fmt"


func main() {
	prices := []float64{10.99, 8.99}
	fmt.Println(prices[1])

	prices = append(prices, 9.99, 12.99, 29.99, 100.10)
	fmt.Println(prices)

	discountPrices := []float64{101.99, 80.99, 20.59}
	fmt.Println(discountPrices)
	prices = append(prices, discountPrices...)
	fmt.Println(prices)
}

// func main() {
// 	var productNames [4]string 
// 	productNames = [4]string {"A Book"}
// 	prices := [4]float64{10.99, 9.99, 45.99, 20.0}
// 	fmt.Println(prices)

// 	productNames[2] = "A Carpet"

// 	fmt.Println(productNames)
// 	fmt.Println(prices[0])

// 	featuredPrices := prices[1:]
// 	fmt.Println(featuredPrices)
// 	featuredPrices[0] = 199.99
// 	highlightedPrices := featuredPrices[:1]
// 	fmt.Println(highlightedPrices)
// 	fmt.Println(prices)
// 	fmt.Println(len(highlightedPrices), cap(highlightedPrices))

// 	highlightedPrices = highlightedPrices[:3]
// 	fmt.Println(len(highlightedPrices), cap(highlightedPrices))

// }