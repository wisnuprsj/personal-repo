package main

import (
	"fmt"
	"math"
)

const inflationRate = 2.5

func main() {
	

	// var investmentAmount, years float64 = 1000, 10
	var investmentAmount float64 
	years := 10.0
	expectedReturnRate := 5.5

	// fmt.Print("Please enter your investment amount: ")
	outputText("Please enter your investment amount: ")
	fmt.Scan(&investmentAmount)

	fmt.Print("Please enter your expected return rate: ")
	fmt.Scan(&expectedReturnRate)

	fmt.Print("Please enter how many years of your investment: ")
	fmt.Scan(&years)

	// futureValue := investmentAmount * math.Pow( (1 + (expectedReturnRate / 100)), years)
	// futureRealValue := futureValue / math.Pow(1 + inflationRate / 100, years)

	futureValue, futureRealValue := calculateFutureValue(investmentAmount, expectedReturnRate, years)

	// fmt.Println("Future Value:", futureValue)
	fmt.Printf("Future Value: %.0f\n", futureValue)
	// fmt.Println("Future Real Value:", futureRealValue)
	fmt.Printf("Future Real Value: %.0f\n", futureRealValue)

	// var revenue float64
	// var expenses float64
	// taxRate := 12.5

	// fmt.Print("Please enter your revenue amount: ")
	// fmt.Scan(&revenue)

	// fmt.Print("Please enter your expenses: ")
	// fmt.Scan(&expenses)

	// fmt.Print("Please enter your tax rate currently: ")
	// fmt.Scan(&taxRate)

	// profitValueBeforeTax := revenue - expenses
	// profitValueAfterTax := (revenue - expenses) * (1 - taxRate/100)
	// ratio := profitValueBeforeTax/profitValueAfterTax

	// fmt.Println(profitValueBeforeTax)
	// fmt.Println(profitValueAfterTax)
	// fmt.Println(ratio)
}

func outputText(text string) {
	fmt.Print(text)
}

func calculateFutureValue(investmentAmount float64, expectedReturnRate float64, years float64) (fV float64, fRV float64) {
	fV = investmentAmount * math.Pow( (1 + (expectedReturnRate / 100)), years)
	fRV = fV / math.Pow(1 + inflationRate / 100, years)
	return fV, fRV
}