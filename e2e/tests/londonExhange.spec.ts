import { test, expect } from "../fixtures/londonExchange";

test.describe("London Stock Exchange Tests", () => {
  test("Fetch FTSE 100’s latest top 10 constituentstop 10 highest % change", async ({
    landingPage,
    indicesFtsePage,
  }) => {
    await landingPage.navigateToFtse100();
    await indicesFtsePage.openConstituents();
    await indicesFtsePage.sortByHighestToLowest();
    await indicesFtsePage.verifyTableSortedHighestToLowest();
    await indicesFtsePage.getTopConstituents();
  });

  test("Fetch FTSE 100’s latest top 10 constituents top 10 lowest % change", async ({
    landingPage,
    indicesFtsePage,
    page,
  }) => {
    await landingPage.navigateToFtse100();
    await indicesFtsePage.openConstituents();
    await indicesFtsePage.sortByLowestToHighest();
    await indicesFtsePage.verifyTableSortedLowestToHighest();
    await indicesFtsePage.getTopConstituents();
  });

  test("Fetch FTSE 100’s constituents with Market Cap > 7M", async ({
    landingPage,
    indicesFtsePage,
  }) => {
    await landingPage.navigateToFtse100();
    await indicesFtsePage.openConstituents();
    await indicesFtsePage.marketCapPagination();
  });

  test("Find lowest average index value month for past three years", async ({
    landingPage,
    indicesFtsePage,
  }) => {
    await landingPage.navigateToFtse100();
    await indicesFtsePage.openOverviewTab();
    await indicesFtsePage.modifyChartCalendar();
    await indicesFtsePage.lowestAverageIndexValueMonth();
  });
});
