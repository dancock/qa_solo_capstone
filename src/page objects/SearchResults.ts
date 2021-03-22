import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
} from "selenium-webdriver";
import { BasePage } from "./BasePage";
const fs = require("fs");
//updating something
export class SearchPage extends BasePage {
    //topicSearchbarMovies: By = By.css('input[placeHolder = "E.g. horses"]');
    //topicSearchbarPeople: By = By.css('input[placeHolder = "E.g. arrested"]');
    //searchPulldown: By = By.css('label[for = "navbar-search-category-select"]');
    //advSrchBtn: By = By.css('a[href = "https://www.imdb.com/search/"]');
    //plotKeyword: By = By.css('h1.header');
    //movieAdvPulldown: By = By.xpath('(//select[@class="ipl-select__input"])[1]');
    //peopleAdvPulldown: By = By.xpath('(//select[@class="ipl-select__input"])[2]');
    //searchComboBox: By = By.css('label[aria-label="All"]');


    searchKeyword = "peppers";
    //resultsKeywordSelector = '//input[@value="peppers"]';
    resultsKeyword: By = By.xpath(`'(//input[@value="${this.searchKeyword}"])'`);
    searchResults: By = By.xpath('//div[@id="results"]');  //searchResults: By = By.css('div#results');
    firstPageResults;
    numberResults: By = By.xpath('//div[@class="results"]'); //searchResults: By = By.css('div.results');
    resultsSearchbar: By = By.xpath('//li[@class="sf-field-search"]');
    resutsSearchButton: By = By.xpath('//li[@class="sf-field-submit"]');







    constructor(options) {
        super(options);
        this.url = "https://bonnieplants.com";
    };
    async pleasePleasePleaseWork(elementBy: By) {
        let element = await this.getElement(elementBy);
        return await element.getText();
    }
    /**
    * returns text to the topicSearchbarMovies and presses enter 
    * @param {content} string - the text to search for
    * 
    */
    async doAdvSrchMov(content) {
        return this.sendKeys(this.topicSearchbarMovies, `${content}\n`); //remove this method?
    }
    /**
     * returns text to the topicSearchbarPeople and presses enter 
     * @param {content} string - the text to search for
     * 
     */
    async doAdvSrchPpl(content) {
        return this.sendKeys(this.topicSearchbarPeople, `${content}\n`); //remove this method?
    };
    /**
     * will verify if a file exists in a specifice path.
     * @param path  - the path where the file is/isn't.
     * @param exists - boolean for the file existing in specified path.
     * @returns 
     */
    async fileExists(path: string, exists: boolean) {
        if (fs.existsSync(path)) {
            // File exists in path
            exists = true;
            return exists;
        } else {
            // File doesn't exist in path
            exists = false;
            return exists;
        }
    };
    async writeToFile(filepath: string, elementBy: By, extension?: string) {
        let element = (await this.pleasePleasePleaseWork(this.plotKeyword)).toString();
        fs.writeFile(
            `${filepath}${extension}`,
            `${element}`,
            'utf8',
            (e) => {
                if (e) console.log(e);
                else return element;
            }
        )
    };
    /*async someWeirdMethodThing() {
        //https://developer.mozilla.org/en-US/docs/Web/XPath/Introduction_to_using_XPath_in_JavaScript

        var xpathResult = document.evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result);
        var xpEvaluator = new XPathEvaluator();
        var nsResolver = xpEvaluator.createNSResolver(contextNode.ownerDocument == null ? contextNode.documentElement : contextNode.ownerDocument.documentElement);
        var paragraphCount = document.evaluate('count(//p)', document, null, XPathResult.ANY_TYPE, null);
        alert('This document contains ' + paragraphCount.numberValue + ' paragraph elements');
        var iterator = document.evaluate('//phoneNumber', documentNode, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

        try {
            var thisNode = iterator.iterateNext();

            while (thisNode) {
                alert(thisNode.textContent);
                thisNode = iterator.iterateNext();
            }
        }
        catch (e) {
            alert('Error: Document tree modified during iteration ' + e);
        }
        var nodesSnapshot = document.evaluate('//phoneNumber', documentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            alert(nodesSnapshot.snapshotItem(i).textContent);
        }
        var firstPhoneNumber = document.evaluate('//phoneNumber', documentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        alert('The first phone number found is ' + firstPhoneNumber.singleNodeValue.textContent);
        var headings = document.evaluate('//h2', document, null, XPathResult.ANY_TYPE, null);
        var thisHeading = headings.iterateNext();

        var alertText = 'Level 2 headings in this document are:\n'

        while (thisHeading) {
            alertText += thisHeading.textContent + '\n';
            thisHeading = headings.iterateNext();
        }
        var req = new XMLHttpRequest();

        req.open("GET", "chrome://yourextension/content/peopleDB.xml", false);
        req.send(null);

        var xmlDoc = req.responseXML;

        var nsResolver = xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);

        var personIterator = xmlDoc.evaluate('//person', xmlDoc, nsResolver, XPathResult.ANY_TYPE, null);
        Components.classes["@mozilla.org/dom/xpath-evaluator;1"].createInstance(Components.interfaces.nsIDOMXPathEvaluator);

        function nsResolver(prefix) {
            var ns = {
                'xhtml': 'http://www.w3.org/1999/xhtml',
                'mathml': 'http://www.w3.org/1998/Math/MathML'
            };
            return ns[prefix] || null;
        }
        document.evaluate('//xhtml:td/mathml:math', document, nsResolver, XPathResult.ANY_TYPE, null);

        function resolver() {
            return 'http://www.w3.org/2005/Atom';
        }
        doc.evaluate('//myns:entry', doc, resolver, XPathResult.ANY_TYPE, null)

        var xpathEls = 'someElements[@*[local-name() = "href" and namespace-uri() = "http://www.w3.org/1999/xlink"]]'; // Grabs elements with any single attribute that has both the local name 'href' and the XLink namespace
        var thislevel = xml.evaluate(xpathEls, xml, null, XPathResult.ANY_TYPE, null);
        var thisitemEl = thislevel.iterateNext();
    }*/
};
