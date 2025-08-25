import { expect, Page } from "@playwright/test";

export class LandingPage {
  constructor(protected page: Page) {}

  // Locators
  public get marketLatestSection() {
    return this.page.locator("#indices-with-risers-and-fallers-and-volume");
  }

  public get cookieTitle() {
    return this.page.getByRole("heading", { name: "Our use of cookies" });
  }

  public get rejectAllCookies() {
    return this.page.getByRole("button", { name: "Reject all" });
  }

  public get labelNewsAndPrices() {
    return this.page.getByLabel("News and Prices");
  }

  public get subNavLinkFtse100() {
    return this.page.locator("li.sub-nav-link a", { hasText: "FTSE 100" });
  }

  // Methods

  async navigateToFtse100() {
    await expect(this.labelNewsAndPrices).toBeVisible();
    await this.labelNewsAndPrices.click();
    await expect(this.subNavLinkFtse100).toBeVisible();
    await this.subNavLinkFtse100.click();
  }

  async handleCookies() {
    await expect(this.cookieTitle).toBeVisible();
    if (await this.cookieTitle.isVisible()) {
      console.log("Cookie banner found → Rejecting all cookies...");
      await this.rejectAllCookies.click();
    } else {
      console.log(" No cookie banner found → Continuing tests");
    }
  }
}
