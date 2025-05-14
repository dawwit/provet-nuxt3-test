# ProVet Sign-Up Form

A simple sign-up form application built with Nuxt 3 and ProVet Cloud components.

## Description

This project demonstrates a clean implementation of a sign-up form using Nuxt 3 and the ProVet Cloud component library. It features a responsive UI with validation and a success page after form submission.

## Features

- User sign-up form with validation
- Password visibility toggle
- Success page after form submission
- Integrated ProVet Cloud components and styling
- End-to-end testing with Playwright

## Tech Stack

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [ProVet Cloud Components](https://www.provetcloud.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/) for end-to-end testing
- [ESLint](https://eslint.org/) for code quality
- [Husky](https://typicode.github.io/husky/) for Git hooks

## Getting Started

### Prerequisites

- Node.js (v22 or higher recommended)
- npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run generate` - Generate a static version of the application
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Automatically fix linting issues
- `npm run type-check` - Check TypeScript types
- `npm test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI
- `npm run test:headed` - Run Playwright tests in headed mode

## Testing

The project uses Playwright for end-to-end testing. Tests follow the Given-When-Then pattern for better readability and maintainability.

### Test Structure

- **Given**: Sets up the test conditions
- **When**: Performs actions
- **Then**: Verifies the expected outcomes

To run the tests:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in headed browser mode
npm run test:headed
```

### Continuous Integration

The project uses GitHub Actions for automated testing. The workflow runs all E2E tests on every push to the main branch and on pull requests.

The CI workflow:

- Sets up Node.js environment
- Installs dependencies
- Sets up Playwright
- Runs all E2E tests
- Uploads test results as artifacts

You can also manually trigger the workflow from the "Actions" tab in the GitHub repository.

## Project Structure

```
provet/
├── .husky/                # Git hooks configuration
├── assets/                # Static assets
├── components/            # Vue components
│   ├── SignUp.vue         # Sign-up form component
│   └── SignUpSuccess.vue  # Success page component
├── layouts/               # Page layouts
├── pages/                 # Application pages
│   ├── index.vue          # Home page with sign-up form
│   └── success.vue        # Success page after sign-up
├── public/                # Public files
├── tests/                 # Test files
│   ├── signup.spec.ts     # Sign-up form tests
│   └── utils/             # Test utilities
│       └── provet-components.ts # Utilities for testing Provet components
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore configuration
├── app.vue                # Main application component
├── nuxt.config.ts         # Nuxt configuration
├── package.json           # Package configuration
├── playwright.config.ts   # Playwright configuration
└── tsconfig.json          # TypeScript configuration
```

## Commit History

The project was developed with the following major milestones:

1. Initial Nuxt project setup
2. Integration of ProVet Cloud components and basic form setup
3. Implementation of sign-up form functionality
4. Addition of success page
5. Code quality improvements with ESLint and TypeScript checks
6. Setup of development tools and Git hooks
7. Addition of Playwright end-to-end tests
