import { SearchPage } from "../page objects/SearchResults";
//something to update

describe("search testing", () => {
    const page = new SearchPage({ browser: "chrome" });
    beforeEach(async () => {
        await page.navigate();
    });
    test("verify the keyword 'alphabet' is the same on the search results page", async () => {
        //we need to search for a keyword
        //set the search term as alphabet
        let searchTerm = "alphabet";
        //we need to search for a keyword
        await page.doSearch(searchTerm);
        //expect the keyword is in the results
        expect(await page.pleasePleasePleaseWork(page.keyword)).toContain(searchTerm);
        
    });
    test("verify the keyword 'character' is in the search results", async () => {
        //we need to search for a keyword
        //set the search term as character
        let searchTerm = "character";
        //we need to search for a keyword
        await page.doSearch(searchTerm);
        //expect the keyword is in the results
        expect(await page.pleasePleasePleaseWork(page.results)).toContain(searchTerm);
    });
    test("verify the keyword 'Tucker and Dale vs. Evil' is on the advanced movie seach results page", async () => {
        //we need to advance search for a keyword
        //set the search term as number
        let searchTerm = "Tucker and Dale vs. Evil";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click advanced search
        await page.click(page.advSrchBtn);
        //search for a keyword
        await page.doAdvSrchMov(searchTerm);
        //expect the keyword is in the advanced results
        //expect(await page.pleasePleasePleaseWork(page.keyword)).toContain(searchTerm);
        expect(await page.pleasePleasePleaseWork(page.results)).toContain(searchTerm);
    })
    test("verify the keyword 'Dan Hoffman' is in the advanced people search results", async () => {
        //we need to advance search for a keyword
        //set the search term as Dan Hoffman
        let searchTerm = "Dan Hoffman";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click advanced search
        await page.click(page.advSrchBtn);
        //search for a keyword
        await page.doAdvSrchPpl(searchTerm);
        //expect the keyword is in the advanced results
        expect(await page.pleasePleasePleaseWork(page.results)).toContain(searchTerm);
    });
    test("Screenshotting the 'monkey' page", async () => {
        //set the search term as monkey
        let searchTerm = "monkey";
        //we need to search for monkey
        await page.doSearch(searchTerm);
        //and then we can take the screenshot
        await page.takeScreenshot("./src/files/screenshots/MonkeyScreenshot");
        expect(await page.fileExists("./src/files/screenshots/MonkeyScreenshot.png", true));
    });
    test("Screenshotting the advanced movie search 'banana' page results", async () => {
        //set the search term as banana
        let searchTerm = "banana";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click advanced search
        await page.click(page.advSrchBtn);
        //we need to search for banana in advanced search
        await page.doAdvSrchMov(searchTerm);
        //and then we can take the screenshot
        await page.takeScreenshot("./src/files/screenshots/BananaScreenshot");
        expect(await page.fileExists("./src/files/screenshots/BananaScreenshot.png", true));
    })
    test("Screenshotting the advanced movie search 'raffle' page results", async () => {
        //set the search term as raffle
        let searchTerm = "raffle";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click on advanced search
        await page.click(page.advSrchBtn);
        //we need to search for raffle in advanced search
        await page.doAdvSrchPpl(searchTerm);
        //and then we can take the screenshot
        await page.takeScreenshot("./src/files/screenshots/RaffleScreenshot");
        //expect that the search keyword is raffle
        expect(await page.fileExists("./src/files/screenshots/RaffleScreenshot.png", true));
    })
    test("returing search keyword to a json", async () => {
        let searchTerm = "advanced";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click on advanced search
        await page.click(page.advSrchBtn);
        //we need to search for a keyword in advanced search
        await page.doAdvSrchMov(searchTerm);
        //and then we can send the results to a json
        await page.writeToFile("./src/files/SearchResultsJson", page.keyword, ".json");
        //then the expect should be if the json exists?
        expect(await page.fileExists("./src/files/SearchResultsJson.json", true));
    })
    test("returning search keyword to a txt file", async () => {
        let searchTerm = "advanced";
        //click search pulldown
        await page.click(page.searchPulldown);
        //click on advanced search
        await page.click(page.advSrchBtn);
        //we need to search for a keyword in advanced search
        await page.doAdvSrchMov(searchTerm);
        //and then we can send the results to a json
        await page.writeToFile("./src/files/SearchResultsText", page.keyword , ".txt");
        //then the expect should be if the json exists?
        expect(await page.fileExists("./src/files/SearchResultsText.txt", true));
    })
    afterAll(async () => {
        await page.driver.quit();
    });
});
