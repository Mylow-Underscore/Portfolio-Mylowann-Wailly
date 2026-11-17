'use client'

import { test, expect } from '@playwright/test'

test.describe('Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login')

    // Fill in the credentials
    // Note: Using dummy data, these should be adjusted or mocked for production tests
    await page.fill('input[name="identifiant"]', 'test_user')
    await page.fill('input[name="mot_de_passe"]', 'password123')

    // Click login button
    await page.click('button[type="submit"]')

    // Wait for navigation to the account page
    await page.waitForURL('**/compte')

    // Check if the account page title is visible
    const header = page.locator('h1')
    await expect(header).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[name="identifiant"]', 'wrong_user')
    await page.fill('input[name="mot_de_passe"]', 'wrong_pass')
    await page.click('button[type="submit"]')

    // Check for error message
    const errorMsg = page.locator('.text-red-500') // Based on your login page classes
    await expect(errorMsg).toBeVisible()
    await expect(errorMsg).toContainText('Erreur')
  })
})
