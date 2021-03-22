import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";
  const fs = require("fs");
  const chromedriver = require("chromedriver");
  const geckodriver = require("geckodriver");
  
  /** Optional parameters for the page object */
  interface Options {
    /** if no driver is supplied, we make one */
    driver?: WebDriver;
    /** if no driver is supplied, will check for preferred browser (default chrome) */
    browser?: "chrome" | "firefox";
    /** some pages may have a base url */
    url?: string;
  }
  
  
  export class BasePage {
    driver: WebDriver;
    url: string; // = "https://bonnieplants.com"
    //searchBar: By = By.name('');
    //keyword: By = By.css('');
    //results: By = By.css('');
    content: string;
    displayedSearchbar: By = By.xpath('(//input[@name="_sf_s"])[1]');
    displayedSearchButton;
    hiddenSearchbar: By = By.xpath('(//input[@name="_sf_s"])[2]');
    hiddenSearchButton;
  
    /**
     *
     * @param {Options} options - optional paramaters for the base page object.
     * @property {WebDriver} options.driver - if no driver is provided, one will be created
     * @property {string} options.url - provide this if the page has a base url
     */
    constructor(options?: Options) {
      if (options && options.driver) this.driver = options.driver;
      if (
        options &&
        options.browser &&
        options.browser == "firefox" &&
        options.driver == undefined
      )
        this.driver = new Builder()
          .withCapabilities(Capabilities.firefox())
          .build();
      else
        this.driver = new Builder()
          .withCapabilities(Capabilities.chrome())
          .build();
      if (options && options.url) this.url = options.url;
    }
    /**
     * navigates to the url passed in, or to the one stored on the page object
     * @param {string} url - the url to navigate to, unless you wish to use the page's defined base url
     */
    async navigate(url?: string): Promise<void> {
      if (url) return await this.driver.get(url);
      else if (this.url) return await this.driver.get(this.url);
      else
        return Promise.reject(
          "BasePage.navigate() needs a URL defined on the page object, or one passed in. No URL was provided."
        );
    }
    /**
     * waits for the identified element to be located and visible before returning it.
     * @param {By} elementBy - the locator for the element to return.
     */
    async getElement(elementBy: By): Promise<WebElement> {
      await this.driver.wait(until.elementLocated(elementBy));
      let element = await this.driver.findElement(elementBy);
      await this.driver.wait(until.elementIsVisible(element));
      return element;
    }
    /**
     * clicks the given element after waiting for it
     * @param {By} elementBy - the locator for the element to click
     */
    async click(elementBy: By): Promise<void> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(element));
      return await element.click();
    }
    /**
     * clears the given element after waiting for it, and then sends the provided keys
     * @param {By} elementBy - the locator for the element to clear and sendKeys to
     * @param {any} keys - the string or list of keys to send
     */
    async setInput(elementBy: By, keys: any): Promise<void> {
      let input = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(input));
      await input.clear();
      return input.sendKeys(keys);
    }
    /**
     * returns an element's text after waiting for it to be visible
     * @param {By} elementBy - the locator of the element to get text from
     */
    async getText(elementBy: By): Promise<string> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(element));
      return element.getText();
    }
    /**
     * returns text in searchBar and presses enter 
     * @param {content} string - the text to search for
     * 
     */
    async doSearch(content): Promise<void> {
      return this.sendKeys(this.searchBar, `${content}\n`);
    }
    /**
     * enters keys into an element
     * @param {By} elementBy - the locator of the element to send keys to
     * 
     */
    async sendKeys(elementBy: By, keys): Promise<void>  {
      await this.driver.wait(until.elementLocated(elementBy));
      return this.driver.findElement(elementBy).sendKeys(keys);
    }
    /**
     * the results article of a search
     * @param {results} string - the results
     * 
     */
    async getResults(): Promise<string>  {
      return this.getText(this.results);
    }
    /**
     * returns an element's attribute value after waiting for the element to be visible
     * @param {By} elementBy - the locator of the element to get the value from
     * @param {string} attribute - the attribute to return the value from, such as 'value' or 'href'
     */
    async getAttribute(elementBy: By, attribute: string): Promise<string> {
      let element = await this.getElement(elementBy);
      await this.driver.wait(until.elementIsEnabled(element));
      return element.getAttribute(attribute);
    }
    /**
     * Will take a screenshot and save it to the filepath/filename provided.
     * Automatically saves as a .png file.
     * @param {string} filepath - the filepath relative to the project's base folder where you want the screenshot saved
     * @example - page.takeScreenshot("myFolder/mypic")
     * //picture saves in "myFolder" as "mypic.png"
     */
    async takeScreenshot(filepath: string): Promise<void>  {
      fs.writeFile(
        `${filepath}.png`,
        await this.driver.takeScreenshot(),
        "base64",
        (e) => {
          if (e) console.log(e);
          else return filepath; //console.log("screenshot saved successfully");
        }
      );
    }
    /**
     * Will resize the browser window to the maximum.
     */
    async maxWndw () {
        await this.driver.manage().window().maximize();
    }
    /**
     * Will resize the browser window to half my display resolution.
     */
    async rstDwnWndw () {
        await this.driver.manage().window().setSize(800, 450);
        //half the size of my display resolution
        await this.driver.sendKeys(CONTROL +'t');
    }
  }
  