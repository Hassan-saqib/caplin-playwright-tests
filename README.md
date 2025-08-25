This repository contains Playwright test automation for the London Stock Exchange website

## 📋 Test Scenario Overview

Automated testing solution for the London Stock Exchange website (https://www.londonstockexchange.com/) with the following test cases:

1. **FTSE 100 Highest % Change**: Identify and extract the top 10 constituents with the highest percentage change
2. **FTSE 100 Lowest % Change**: Identify and extract the top 10 constituents with the lowest percentage change
3. **Market Cap Filter**: Extract all FTSE 100 constituents where Market Cap exceeds 7 million
4. **Historical Analysis**: Determine the month with the lowest average index value over the past three years

## 🛠️ Technical Stack

- **Framework**: Playwright with TypeScript
- **Language**: TypeScript
- **Test Runner**: Playwright Test
- **Assertions**: Playwright built-in assertions
- **Pattern**: Page Object Model (POM)- Approach - Lazy-Loaded Locators Using Getters

For this project, I have implemented using getter methods in the Page Object Model, which provides several advantages:

- **Performance Optimization**: Locators are only evaluated when accessed, reducing initial page load time
- **Dynamic Element Handling**: Elements are found fresh each time, automatically handling DOM changes and re-renders
- **Memory Efficiency**: No unnecessary DOM queries are performed until the element is actually needed
- **Stale Element Prevention**: Eliminates stale element reference errors common with traditional stored locators
- **Cleaner Syntax**: Getter methods provide intuitive property-like access (`this.submitButton` vs `this.getSubmitButton()`)
- **Framework Alignment**: Follows Playwright's recommended best practices for reliable element interaction

## 📁 Project Structure

```
├── e2e/
│   ├── fixtures/
│   │   ├
│   │   └── londonExchange.ts     # Test fixtures and setup
│   ├── pages/
│   │   ├── landingpage.page.ts   # Landing page object
│   │   └── indicesFtse.page.ts   # FTSE indices page object
│   └── tests/
│       └── londonExchange.spec.ts # Main test suite
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hassan-saqib/caplin-playwright-tests.git
   cd caplin-playwright-tests
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```


### Generate HTML Report

```bash
npx playwright show-report
```

## 📊 Test Cases

### 1. FTSE 100 Highest % Change

- **Purpose**: Extract the top 10 constituents with the highest percentage change
- **Method**: Sorts constituents table by % change (highest to lowest)
- **Assertions**: Verifies table sorting and data extraction

### 2. FTSE 100 Lowest % Change

- **Purpose**: Extract the top 10 constituents with the lowest percentage change
- **Method**: Sorts constituents table by % change (lowest to highest)
- **Assertions**: Verifies table sorting and data extraction

### 3. Market Cap > 7M Filter

- **Purpose**: Find all constituents with a Market Cap exceeding 7 million
- **Method**: Filters and paginates through constituents data
- **Assertions**: Verifies filtering logic and data validation

### 4. Historical Index Analysis

- **Purpose**: Determine the lowest average index month over the past 3 years
- **Method**: Analyzes historical chart data with date range filtering
- **Assertions**: Verifies chart data and calculations

## 🔧 Configuration

The project uses `playwright.config.ts` for configuration:

- Multiple browser support (Chromium, Firefox, WebKit)
- Parallel test execution
- Screenshot and video recording on failure
- Custom timeouts and retries

## 📈 Features

- **Dynamic Solution**: Handles dynamic content and loading states
- **Robust Assertions**: Comprehensive element and data validation
- **Page Object Model**: Maintainable and scalable test architecture
- **Cookie Handling**: Automated cookie consent management
- **Error Handling**: Graceful handling of network and UI issues
- **Detailed Reporting**: HTML reports with screenshots and traces

## 🔍 Key Implementation Details

### Fixtures

- Custom test fixtures for page initialization
- Automated cookie handling on the landing page
- Shared page objects across test cases

### Page Objects

- `LandingPage`: Navigation and initial setup
- `IndicesFtsePage`: FTSE 100 specific interactions and data extraction

### Dynamic Elements

- Waits for elements to be visible/interactable
- Handles loading states and dynamic content
- Robust selectors for stable automation


## 📝 Test Results

Test execution provides:

- Console output with extracted data
- HTML reports with detailed test steps
- Screenshots on failure
- Video recordings for debugging
- Trace files for detailed analysis

## 🔒 Security

- No sensitive information stored in repository
- Environment-based configuration support
- Secure handling of test data

---

**Repository**: https://github.com/Hassan-saqib/caplin-playwright-tests  
**Test Framework**: Playwright with TypeScript  
**Target Website**: https://www.londonstockexchange.com/
