package selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class SelIntroduction {

    public static void main(String[] args) {
        // Invoking Browser
        // Chrome - ChromeDriver -> Methods
        // Firefox - FirefoxDriver -> Methods
//        // Chrome Launch
//        ChromeOptions chromeOptions = new ChromeOptions();
//        chromeOptions.addArguments("--remote-allow-origins=*");
//
//        System.setProperty("webdriver.chrome.driver", "C://Program Files/Google/Chrome/ChromeDriver 114/chromedriver.exe");
//        WebDriver driver = new ChromeDriver(chromeOptions);
//        driver.get("https://www.udemy.com");
//        System.out.println(driver.getTitle());
//        System.out.println(driver.getCurrentUrl());
//        driver.close();
//        driver.quit();

//      // Firefox Launch
        // Gecko Driver
        System.setProperty("webdriver.gecko.driver", "C://Program Files/Mozilla Firefox/driver/geckodriver.exe");
//        FirefoxOptions firefoxOptions = new FirefoxOptions();
//        firefoxOptions.addArguments("--remote-allow-origins=*");
        WebDriverManager.firefoxdriver().setup();
        WebDriver driver = new FirefoxDriver();
        driver.get("https://www.udemy.com");
        System.out.println(driver.getTitle());
        System.out.println(driver.getCurrentUrl());
        driver.close();
        driver.quit();

    }

}
