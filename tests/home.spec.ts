import { test, expect } from "@playwright/test"

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("should display page title", async ({ page }) => {
    await expect(page).toHaveTitle("Credit Cards - Eligibility Checker")
  })

  test("should display heading and description", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Find your perfect credit card" })).toBeVisible()
    await expect(page.getByText("Check your eligibility and find the best offers available to you")).toBeVisible()
  })

  test("should have a logo that links to home", async ({ page }) => {
    const logo = page.locator("#credit-cards-logo")
    await expect(logo).toBeVisible()

    const logoLink = page.getByRole("link").filter({ has: logo })
    await expect(logoLink).toHaveAttribute("href", "/")
  })

  test("should display 3 credit card images", async ({ page }) => {
    const cardImages = page.locator('img[alt="Credit Card Image"]')
    await expect(cardImages).toHaveCount(3)
  })

  test("should have a link to credit cards page", async ({ page }) => {
    const ctaLink = page.getByRole("link", { name: "Check eligibility now" })
    await expect(ctaLink).toBeVisible()
    await expect(ctaLink).toHaveAttribute("href", "/credit-cards")
    await ctaLink.click()
    await expect(page).toHaveURL("/credit-cards")
  })

  test("should display header and footer", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()
  })
})
