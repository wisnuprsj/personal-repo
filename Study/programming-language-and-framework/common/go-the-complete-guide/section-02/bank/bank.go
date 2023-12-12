package main

import (
	"fmt"
	"os"
	"strconv"
)

const accountBalanceFile = "balance.txt"

var accountBalance float64

func getBalanceFromFile() float64 {
	 data, err := os.ReadFile(accountBalanceFile)

	if err != nil {
		return 0
	}

	 balanceText := string(data)
	 balance, _ := strconv.ParseFloat(balanceText, 64)
	 return balance
}

func writeBalanceToFile(balance float64) {
	balanceText := fmt.Sprint(balance)
	os.WriteFile(accountBalanceFile, []byte(balanceText), 0644)
}

func main() {
	startBank()
}

func startBank() {
	accountBalance = getBalanceFromFile()
	var bankStart bool = true
	fmt.Println("Welcome to Go Bank")
	for bankStart {
		printChoice()

		choice := getChoiceInput()

		switch choice {
		case 1:
			getBalance()
			continue;
		case 2:
			depositBalance()
			writeBalanceToFile(accountBalance)
			continue;
		case 3:
			withdrawMoney()
			writeBalanceToFile(accountBalance)
			continue;
		case 4:
			bankStart = false
		default:
			fmt.Println("Invalid input choice")
			continue;
		}

		// if choice == 1 {
		// 	getBalance()
		// 	continue;
		// }

		// if choice == 2 {
		// 	depositBalance()
		// 	continue;
		// }

		// if choice == 3 {
		// 	withdrawMoney()
		// 	continue;
		// }

		// if choice == 4 {
		// 	bankStart = false
		// }
	}
}

func printChoice() {
	
	fmt.Println("What do you want to do?")
	fmt.Println("1. Check balance")
	fmt.Println("2. Deposit money")
	fmt.Println("3. Withdraw money")
	fmt.Println("4. Exit")
}

func getChoiceInput() int {
	var userInput int
	fmt.Print("Your choice: ")
	fmt.Scan(&userInput)
	return userInput
}

func getUserInput(userText string) float64 {
	var userInput float64
	fmt.Print(userText)
	fmt.Scan(&userInput)
	return userInput
}

func getBalance() {
	fmt.Printf("Your current balance is: %.1f\n", accountBalance)
}

func depositBalance() {
	fmt.Printf("Your current balance is: %.1f\n", accountBalance)
	money := getUserInput("Please input how much do you want to deposit: ")
	if money <= 0 {
		fmt.Printf("Invalid amount, please input amount greater than 0\n")
		depositBalance() 
		return;
	}
	accountBalance += money
	fmt.Printf("Your current balance after deposit is: %.1f\n", accountBalance)
}

func withdrawMoney() {
	fmt.Printf("Your current balance is: %.1f\n", accountBalance)
	money := getUserInput("Please input how much do you want to withdraw: ")

	if money > accountBalance {
		fmt.Printf("There is not enough balance in your account\n")
		withdrawMoney()
		return;
	}

	accountBalance -= money
	fmt.Printf("Your current balance after withdraw is: %.1f\n", accountBalance)

}