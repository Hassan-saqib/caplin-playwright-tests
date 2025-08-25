import { test as base, expect } from "@playwright/test";
import { LandingPage } from "../pages/landingpage.page";
import { IndicesFtsePage } from "../pages/indicesFtse.page";

export const test = base.extend<{
  landingPage: LandingPage;
  indicesFtsePage: IndicesFtsePage;
}>({
  landingPage: async ({ page }, use) => {
    await page.goto("https://www.londonstockexchange.com/");

    const landingPage = new LandingPage(page);
    await landingPage.handleCookies();
    await expect(landingPage.marketLatestSection).toBeVisible();
    console.log("Landing page loaded successfully");

    await use(landingPage);
  },

  indicesFtsePage: async ({ page }, use) => {
    const indicesFtsePage = new IndicesFtsePage(page);
    await use(indicesFtsePage);
  },
});

export { expect } from "@playwright/test";
