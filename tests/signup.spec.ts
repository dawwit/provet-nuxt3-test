import { test, expect } from '@playwright/test';

test.describe('Sign Up Form functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Common setup for all tests
    await page.goto('/');
  });

  test('should display validation errors when submitting an empty form', async ({ page }) => {
    // Given: The user is on the sign up form page
    // (handled by beforeEach)

    // When: The user submits the form without entering any data
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Then: Error messages should be displayed for required fields
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should allow toggling password visibility when clicking the visibility icon', async ({
    page,
  }) => {
    // Given: The user has entered a password
    await page.getByLabel('Password').fill('test123');
    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // When: The user clicks the visibility toggle button
    await page
      .getByRole('button', { name: '' })
      .filter({ has: page.locator('provet-icon') })
      .click();

    // Then: The password should become visible
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // When: The user clicks the visibility toggle button again
    await page
      .getByRole('button', { name: '' })
      .filter({ has: page.locator('provet-icon') })
      .click();

    // Then: The password should be hidden again
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should allow users to opt-in for product updates by checking the newsletter option', async ({
    page,
  }) => {
    // Given: The user is on the sign up form with the checkbox unchecked by default
    const checkbox = page.getByLabel(
      'I want to receive occasional product updates and announcements'
    );
    await expect(checkbox).not.toBeChecked();

    // When: The user checks the newsletter checkbox
    await checkbox.check();

    // Then: The checkbox should be checked
    await expect(checkbox).toBeChecked();
  });

  test('should redirect to success page after submitting valid registration information', async ({
    page,
  }) => {
    // Given: The user has filled in all required fields with valid data
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('I want to receive occasional product updates and announcements').check();

    // When: The user submits the form
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Then: The user should be redirected to the success page
    await expect(page).toHaveURL('/success');

    // And: A success message should be displayed
    await expect(page.getByText("You've successfully signed up!")).toBeVisible();
  });
});

test.describe('Sign Up Success Page content', () => {
  test('should display confirmation elements when user reaches the success page', async ({
    page,
  }) => {
    // Given: The user has been redirected to the success page
    await page.goto('/success');

    // Then: The success icon should be visible
    await expect(page.locator('provet-icon[name="interface-checked-circle"]')).toBeVisible();

    // And: The success message should be visible
    await expect(page.getByText("You've successfully signed up!")).toBeVisible();
  });
});
