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
    try {
      await this.cookieTitle.waitFor({ state: "visible", timeout: 8000 });
      console.log("Cookie banner found → Rejecting all cookies...");
      await this.rejectAllCookies.click();
    } catch {
      console.log("No cookie banner found → Continuing tests");
    }
  }

  async navigateToLandingPage() {
    try {
      await this.marketLatestSection.waitFor({
        state: "visible",
        timeout: 8000,
      });
      console.log("Landing page loaded successfully");
    } catch {
      console.log("Landing page failed to load, continuing tests");
    }
  }
}
