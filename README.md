# Group 2's Project

- [Summary](#summary)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [What Do We Test](#what-do-we-test)
- [How Do We Test](#how-do-we-test)
  - [Page Objects](#page-objects)
  - [Data Files](#data-files)
- [Lessons Learned](#lessons-learned)
- [Tools/technologies used](#tools-technologies-used)
- [Processes Followed](#processes-followed)

## Summary

This project was put together to test bonnieplants.com. For the automation, it uses Jest as a test
runner, and Selenium Webdriver to hook into the browser. Manual test cases are on Jira. 

## Setup

This is how to set up our project.

1. clone it!
1. `npm i`

## Running Tests

To run all the tests, use the command: `npm test`

To run a specific test, use the command: `npx jest test_name`

## What Do We Test

DRH - The functionality I tested for was the Advanced Search. I searched for keywords, and found the keywords on the results. I also found the results on the results. I used the Movies searchbar and the People searchbar. I took screenshots and added keywords to JSON and txt files.

## How Do We Test

We organized our tests using this structure...

### Page Objects

We made page objects for these pages because...

- BasePage
  - A base page for page objects.
- AdvSearchPage
  - A page for the methods and variables that Dan used for the Advanced Search test.
- page 3...

### Data Files

Dan's test creates screenshots of search results and sends keywords to JSON and txt files.

### Lessons Learned
In this section add a few points from your retrospective, or new ideas that come up putting this together. These points should tend towards:
Learned how to create a github repo.
Learned how to create group dm on discord.
Learned how to use xPath selectors better.
Learned how to get text from a page and return it to a text document.

### Tools/technologies used
VS Code
Selenium
Jest
Chrome
Browser Dev Tools
Github
Windows 10


### Processes followed
