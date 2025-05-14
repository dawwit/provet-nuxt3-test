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

  test('should validate email format', async ({ page }) => {
    // Given: The user is on the sign up form page
    // When: The user enters an invalid email and moves to the next field
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').click(); // Blur from email field

    // Then: Email validation error should be displayed
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();

    // When: The user corrects the email
    await page.getByLabel('Email').fill('valid@example.com');
    await page.getByLabel('Password').click(); // Blur from email field

    // Then: Email validation error should disappear
    await expect(page.getByText('Please enter a valid email address')).not.toBeVisible();
  });

  test('should validate password length', async ({ page }) => {
    // Given: The user is on the sign up form page

    // When: The user enters a short password and moves to the next field
    await page.getByLabel('Password').fill('short');
    await page.getByLabel('Email').click(); // Blur from password field

    // Then: Password length error should be displayed
    await expect(page.getByText('Password must be at least 6 characters long')).toBeVisible();

    // When: The user enters a longer password (but still missing requirements)
    await page.getByLabel('Password').fill('longpassword');
    await page.getByLabel('Email').click(); // Blur from password field

    // Then: Password length error should disappear but other password requirements error should appear
    await expect(page.getByText('Password must be at least 6 characters long')).not.toBeVisible();
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).toBeVisible();
  });

  test('should validate password complexity requirements', async ({ page }) => {
    // Given: The user is on the sign up form page

    // When: Password is missing uppercase letter
    await page.getByLabel('Password').fill('password123!');
    await page.getByLabel('Email').click();

    // Then: Password requirements error should be displayed
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).toBeVisible();

    // When: Password is missing lowercase letter
    await page.getByLabel('Password').fill('PASSWORD123!');
    await page.getByLabel('Email').click();

    // Then: Password requirements error should still be displayed
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).toBeVisible();

    // When: Password is missing number
    await page.getByLabel('Password').fill('Password!');
    await page.getByLabel('Email').click();

    // Then: Password requirements error should still be displayed
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).toBeVisible();

    // When: Password is missing special character
    await page.getByLabel('Password').fill('Password123');
    await page.getByLabel('Email').click();

    // Then: Password requirements error should still be displayed
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).toBeVisible();

    // When: Password meets all requirements
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Email').click();

    // Then: Password requirements error should disappear
    await expect(
      page.getByText(
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
    ).not.toBeVisible();
  });

  test('should change password visibility when clicking the toggle button', async ({ page }) => {
    // Given: The user is on the sign up form
    await page.goto('/');

    // Fill the password field
    await page.getByLabel('Password').fill('ValidP@ssword123');

    // Check initial type
    const inputSelector = 'input[name="password"]';
    await expect(page.locator(inputSelector)).toHaveAttribute('type', 'password');

    // When: Toggle password visibility
    const toggleButton = page.locator('provet-input[label="Password"] provet-button');
    await toggleButton.click();

    // Small wait for state to update
    await page.waitForTimeout(100);

    // Then: Password input type should change to text
    await expect(page.locator(inputSelector)).toHaveAttribute('type', 'text');

    // When: Toggle back
    await toggleButton.click();

    // Small wait for state to update
    await page.waitForTimeout(100);

    // Then: Password input type should change back to password
    await expect(page.locator(inputSelector)).toHaveAttribute('type', 'password');
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

  test('should not redirect to success page if form is invalid', async ({ page }) => {
    // Given: The user has filled in invalid information
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('short');

    // When: The user submits the form
    await page.getByRole('button', { name: 'Sign Up' }).click();

    // Then: The user should not be redirected and validation errors should be displayed
    await expect(page).not.toHaveURL('/success');
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Password must be at least 6 characters long')).toBeVisible();
  });

  test('should redirect to success page after submitting valid registration information', async ({
    page,
  }) => {
    // Given: The user has filled in all required fields with valid data
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('ValidP@ssw0rd');
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
