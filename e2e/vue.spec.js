import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveText('Task Manager')
    await expect(page.locator('p')).toHaveText('Welcome to the Task Manager API!')
    // https://playwright.dev/docs/input
})

test('displays task list', async ({ page }) => {
    await page.goto('/')

    // check if the tasks present in the table
    const rows = await page.locator('tbody tr').count()
    expect(rows).toBeGreaterThan(0)

    // check if the fisrt task the same as in app java
    await expect(page.locator('tbody tr').first()).toContainText('Finish homework')
})

test('adds the task', async ({ page }) => {
    await page.goto('/')

    // loads page
    await page.waitForSelector('input[placeholder="Entrez une nouvelle tâche"]')

    // fills new task
    await page.fill('input[placeholder="Entrez une nouvelle tâche"]', 'Task to be added')

    // clicks button ajouter
    await page.click('button:has-text("Ajouter")')

    // wait for succes message
    await expect(page.locator('p:has-text("ajoutée avec succès")')).toBeVisible()

    // search for added task in table
    await expect(page.locator('tbody')).toContainText('Task to be added')
})

test('completes the task', async ({ page }) => {
    await page.goto('/')

    // page loading
    await page.waitForSelector('tbody tr')

    // new task for testing
    await page.fill('input[placeholder="Entrez une nouvelle tâche"]', 'Task to complete')
    await page.click('button:has-text("Ajouter")')

    // wait for succes message
    await expect(page.locator('p:has-text("ajoutée avec succès")')).toBeVisible()

    // take row where the task is located
    const taskRow = page.locator('tbody tr', { hasText: 'Task to complete' })

    // verify the task status is en cours
    const statusCell = taskRow.locator('td').nth(2)
    await expect(statusCell).toHaveText('en cours')

    // click button terminé
    await taskRow.locator('button:has-text("Terminer")').click()

    // wait for the table to update
    await page.waitForTimeout(1000)

    // status changed
    await expect(statusCell).toHaveText('terminé')
})

test('delete the task', async ({ page }) => {
    await page.goto('/')

    // table load
    await page.waitForSelector('tbody tr')

    // add new task
    await page.fill('input[placeholder="Entrez une nouvelle tâche"]', 'Task to be deleted')

    // click the button ajouter
    await page.click('button:has-text("Ajouter")')

    // success message
    await expect(page.locator('p:has-text("ajoutée avec succès")')).toBeVisible()

    // task is in the table
    await expect(page.locator('tbody')).toContainText('Task to be deleted')

    // take the row with the task
    const taskRow = page.locator('tbody tr', { hasText: 'Task to be deleted' })

    // click button supprimer
    await taskRow.locator('button:has-text("Supprimer")').click()

    // wait for table update
    await page.waitForTimeout(1000)

    // task is no longer in the table
    await expect(page.locator('tbody')).not.toContainText('Task to be deleted')

})
