import { test, expect, type Page } from "@playwright/test"
import { AVAILABLE_CUSTOMERS } from "@/constants"

const requiredFormFields = Object.keys(AVAILABLE_CUSTOMERS[0]).filter((key) => key !== "id" && key !== "profileImageUrl")

async function selectCustomerAndFillForm(page: Page) {
  await page.locator(".customer-card").first().click()

  await page.locator('[name="title"]').selectOption("Mr")
  await page.locator('[name="email"]').fill("test@example.com")
  await page.locator('[name="firstName"]').fill("Test")
  await page.locator('[name="lastName"]').fill("User")
  await page.locator('[name="dateOfBirth"]').fill("1990-01-01")
  await page.locator('[name="annualIncome"]').fill("50000")
  await page.locator('[name="houseNumber"]').fill("123")
  await page.locator('[name="postcode"]').fill("SW1A 1AA")
  await page.locator('[name="employmentStatus"]').selectOption("Full time")
}

async function submitForm(page: Page) {
  await page.getByRole("button", { name: "Submit" }).click()
  await expect(page.getByRole("dialog")).not.toBeVisible()
}

test.describe("Credit Cards Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/credit-cards")
  })

  test("should display sign in modal on first visit", async ({ page }) => {
    await expect(page.getByText("Sign in to check eligibility")).toBeVisible()
    await expect(page.getByRole("dialog")).toBeVisible()
  })

  test("should display a list of available customers and a new customer option", async ({ page }) => {
    const customerButtons = page.locator(".customer-card")
    await expect(customerButtons).toHaveCount(AVAILABLE_CUSTOMERS.length + 1) // + 1 = new customer
    for (const customer of AVAILABLE_CUSTOMERS) {
      await expect(customerButtons.getByText(`${customer.firstName} ${customer.lastName}`)).toBeVisible()
    }
    await expect(customerButtons.getByText("New customer")).toBeVisible()
  })

  test("should display a form with required fields when a customer is selected", async ({ page }) => {
    const customerButtons = page.locator(".customer-card")
    await customerButtons.first().click()
    await expect(page.getByText("Fill the form to continue")).toBeVisible()

    for (const fieldName of requiredFormFields) {
      await expect(page.locator(`[name="${fieldName}"]`)).toBeVisible()
    }
  })

  test("should have a button to submit the form", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)
  })

  test("should have a button to go back to the customer selector", async ({ page }) => {
    await selectCustomerAndFillForm(page)

    await expect(page.getByText("Fill the form to continue")).toBeVisible()
    await page.getByRole("button", { name: "Back", exact: true }).click()
    await expect(page.getByText("Sign in to check eligibility")).toBeVisible()
  })

  test("should show credit card offers after form submission", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)

    await expect(page.getByText("Select the credit cards that work best for you")).toBeVisible()
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible()
  })

  test("should allow selecting credit cards and show total", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)

    const firstCard = page.locator(".bg-card").first()
    await firstCard.getByRole("button", { name: "Select" }).click()

    await expect(page.getByText("Total credit available:")).toBeVisible()
    await expect(page.getByRole("button", { name: /Apply for/ })).toBeVisible()
  })

  test("should display success modal after applying", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)

    await page.getByRole("button", { name: "Select" }).first().click()
    await page.getByRole("button", { name: /Apply for/ }).click()

    await expect(page.getByText("Done!")).toBeVisible()
    await expect(page.getByText("Your application has been submitted successfully")).toBeVisible()
    await expect(page.getByRole("button", { name: "Back to home" })).toBeVisible()
  })

  test("should display card details modal when details button is clicked", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)

    await page.getByRole("button", { name: "Details" }).first().click()
    await expect(page.getByText("Credit Card Details")).toBeVisible()
  })

  test("should navigate back to home from logout link", async ({ page }) => {
    await selectCustomerAndFillForm(page)
    await submitForm(page)

    await page.getByRole("link", { name: "Logout" }).click()
    await expect(page).toHaveURL("/")
    await expect(page.getByRole("heading", { name: "Find your perfect credit card" })).toBeVisible()
  })
})
