import { Page, Locator } from '@playwright/test';

/**
 * Utility functions to help test Provet Cloud Design System web components
 */
export class ProvetComponents {
  constructor(private readonly page: Page) {}

  /**
   * Get a Provet input component by its label
   */
  getInput(label: string): Locator {
    return this.page.locator(`provet-input[label="${label}"]`);
  }

  /**
   * Get a Provet button component by its text
   */
  getButton(text: string): Locator {
    return this.page.locator(`provet-button`).filter({ hasText: text });
  }

  /**
   * Get a Provet checkbox component by its label
   */
  getCheckbox(label: string): Locator {
    return this.page.locator(`provet-checkbox[label="${label}"]`);
  }

  /**
   * Get a Provet icon component by its name
   */
  getIcon(name: string): Locator {
    return this.page.locator(`provet-icon[name="${name}"]`);
  }

  /**
   * Get a Provet card component
   */
  getCard(): Locator {
    return this.page.locator('provet-card');
  }
}
