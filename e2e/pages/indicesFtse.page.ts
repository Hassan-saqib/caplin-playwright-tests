import { expect, Page } from "@playwright/test";

export class IndicesFtsePage {
  constructor(protected page: Page) {}

  // Locators

  public get tapNavConstituentsLink() {
    return this.page.locator("li.tab-nav", {
      has: this.page.locator("a", { hasText: "Constituents" }),
    });
  }

  public get tapNavOverviewLink() {
    return this.page.locator("li.tab-nav", {
      has: this.page.locator("a", { hasText: "Overview" }),
    });
  }

  public get ftse100Table() {
    return this.page.locator("table.ftse-index-table-table");
  }
  public get ftse100Chart() {
    return this.page.locator("#w-advanced-chart-widget").first();
  }

  public get changePercentageHeader() {
    return this.page.locator('th:has-text("Change %")');
  }

  public get highestToLowestSortOption() {
    return this.page
      .locator('th:has-text("Change %")')
      .locator('div[title="Highest – lowest"]');
  }

  public get lowestToHighestSortOption() {
    return this.page
      .locator('th:has-text("Change %")')
      .locator('div[title="Lowest – highest"]');
  }

  public get ftse100TableRows() {
    return this.page.locator("table.ftse-index-table-table tbody tr");
  }

  public get ftse100ChangePercent() {
    return this.page.locator(
      "table.ftse-index-table-table tbody tr td.instrument-percentualchange"
    );
  }

  public get ftse100MarketCapTab() {
    return this.page.locator("th.marketcap span.indented.clickable");
  }

  public get pageOneButton() {
    return this.page.locator("div.paginator a.page-number", { hasText: "1" });
  }

  public get pageTwoButton() {
    return this.page.locator("div.paginator a.page-number", { hasText: "2" });
  }

  public get pageThreeButton() {
    return this.page.locator("div.paginator a.page-number", { hasText: "3" });
  }

  public get pageFourButton() {
    return this.page.locator("div.paginator a.page-number", { hasText: "4" });
  }

  public get pageFiveButton() {
    return this.page.locator("div.paginator a.page-number", { hasText: "5" });
  }

  public get calenderPicker() {
    return this.page.locator(
      'input[placeholder="From dory.common.labels.aria."]'
    );
  }

  public get selectDate() {
    return this.page
      .locator('.b-calendar-grid-body div[role="button"] span.text-dark')
      .first();
  }

  public get previousYearButton() {
    return this.page.locator('button[title="Previous year"]');
  }

  public get calendarButton() {
    return this.page.getByRole("button", { name: "Select From Date" });
  }

  public get dropDownYearButton() {
    return this.page.getByRole("button", { name: "1Y Time Range" });
  }
  public get dropDownOptionFiveYear() {
    return this.page.getByRole("menuitem", { name: "5Y" });
  }

  public get dropDownPeriodicityButton() {
    return this.page.getByRole("button", { name: "Periodicity" });
  }

  public get dropDownOptionMonthly() {
    return this.page.getByRole("menuitem", { name: "Monthly" });
  }

  //Methods

  async verifyTableSortedHighestToLowest() {
    const firstRowBefore = await this.ftse100TableRows
      .first()
      .locator("td.instrument-percentualchange")
      .innerText();

    console.log(`Before sort → ${firstRowBefore}`);

    await this.highestToLowestSortOption.click();
    await this.page.waitForTimeout(3000);

    await expect(async () => {
      const firstRowAfter = await this.ftse100TableRows
        .first()
        .locator("td.instrument-percentualchange")
        .innerText();

      expect(firstRowAfter).toBe(firstRowBefore);
    }).toPass({ timeout: 10000 });

    console.log(
      "Table remains sorted highest to lowest (default order maintained)"
    );
  }

  async verifyTableSortedLowestToHighest() {
    const firstRowBefore = await this.ftse100TableRows
      .first()
      .locator("td.instrument-percentualchange")
      .innerText();

    console.log(`Before sort → ${firstRowBefore}`);

    await this.lowestToHighestSortOption.click();
    await expect(this.changePercentageHeader).toBeVisible();

    await expect(async () => {
      const firstRowAfter = await this.ftse100TableRows
        .first()
        .locator("td.instrument-percentualchange")
        .innerText();

      expect(firstRowAfter).not.toBe(firstRowBefore);
    }).toPass({ timeout: 10000 });

    console.log("Table successfully sorted from lowest to highest");
  }

  async openOverviewTab() {
    await expect(this.tapNavOverviewLink).toBeVisible();
    await expect(this.ftse100Chart).toBeVisible({ timeout: 10000 });
  }

  async modifyChartCalendar() {
    await expect(this.ftse100Chart).toBeVisible({ timeout: 10000 });
    await this.dropDownYearButton.click();
    await this.dropDownOptionFiveYear.click();
    await this.page.waitForTimeout(3000);
    await this.dropDownPeriodicityButton.click();
    await this.dropDownOptionMonthly.click();
    await this.page.waitForTimeout(5000);
  }

  async lowestAverageIndexValueMonth() {
    const points = await this.page.$$('[class*="highcharts-point"]');

    const monthValues: Record<string, number[]> = {};

    const currentYear = new Date().getFullYear();
    for (const point of points) {
      const label = await point.getAttribute("aria-label");
      if (!label) continue;

      const match = label.match(/([\d.]+) \d{1,2} (\w+) \d{4}/);
      if (!match) continue;

      const value = parseFloat(match[1]);
      const month = match[2];
      const year = parseInt(match[3]);

      if (year < currentYear - 2) continue;

      if (!monthValues[month]) monthValues[month] = [];
      monthValues[month].push(value);
    }

    const monthAvg: Record<string, number> = {};
    for (const month in monthValues) {
      const sum = monthValues[month].reduce((a, b) => a + b, 0);
      monthAvg[month] = sum / monthValues[month].length;
    }

    let lowestMonth = "";
    let lowestAvg = Infinity;
    for (const month in monthAvg) {
      if (monthAvg[month] < lowestAvg) {
        lowestAvg = monthAvg[month];
        lowestMonth = month;
      }
    }

    console.log(
      "Lowest average month (last 3 years):",
      lowestMonth,
      "Average:",
      lowestAvg
    );
  }

  async openConstituents() {
    await expect(this.tapNavConstituentsLink).toBeVisible();
    await this.tapNavConstituentsLink.click();
    await expect(this.ftse100Table).toBeVisible({ timeout: 10000 });
  }

  async marketCapPagination() {
    await this.getMarketCap();

    const pageButtons = [
      this.pageTwoButton,
      this.pageThreeButton,
      this.pageFourButton,
      this.pageFiveButton,
    ];

    for (const pageButton of pageButtons) {
      await pageButton.click();
      await this.page.waitForTimeout(3000);
      await this.getMarketCap();
    }
  }

  async sortByHighestToLowest() {
    await expect(this.changePercentageHeader).toBeVisible();
    await this.changePercentageHeader.click();
    await expect(this.highestToLowestSortOption).toBeVisible();
  }

  async sortByLowestToHighest() {
    await expect(this.changePercentageHeader).toBeVisible();
    await this.changePercentageHeader.click();
    await expect(this.lowestToHighestSortOption).toBeVisible();
  }

  async getTopConstituents() {
    const rows = await this.ftse100TableRows.all();

    for (let i = 0; i < 10; i++) {
      const name = await rows[i].locator("td.instrument-name").innerText();
      const change = await rows[i]
        .locator("td.instrument-percentualchange")
        .innerText();
      console.log(`${i + 1}. ${name} → ${change}`);
    }
  }

  async getMarketCap() {
    const rows = await this.ftse100TableRows.all();

    console.log(`Total rows found with Market Cap > 7M : ${rows.length}`);

    for (const row of rows) {
      const company = await row.locator("td.instrument-name").innerText();
      const marketCapText = await row
        .locator("td.instrument-marketcapitalization")
        .innerText();

      const marketCap = parseFloat(marketCapText.replace(/,/g, ""));

      if (marketCap > 7) {
        console.log(`${company} → Market Cap: ${marketCap}`);
      } else {
        console.log(
          "there is no market cap greater than 7M hence no results found"
        );
      }
    }
  }
}
