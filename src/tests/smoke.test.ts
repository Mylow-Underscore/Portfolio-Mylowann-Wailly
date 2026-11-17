'use client'

import { test, expect } from '@playwright/test'


  test('homepage loads and displays main title', async ({ page }) => {
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('footer and header are present', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
