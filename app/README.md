# SpeedL

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.21.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

The app uses [Playwright](https://playwright.dev/) for end-to-end tests. The tests are located in the `e2e/` directory and are configured in `playwright.config.ts`.

Install the Playwright browser binaries once after installing dependencies:

```bash
npx playwright install
```

Run all e2e tests with:

```bash
npm run e2e
```

By default, Playwright uses the base URL from the `PLAYWRIGHT_TEST_BASE_URL` environment variable. If the Angular development server is running on `http://localhost:4200/`, set the variable before running the tests:

```powershell
$env:PLAYWRIGHT_TEST_BASE_URL = 'http://localhost:4200/'
npm run e2e
```

Alternatively, you can add the variable to an `.env` file:

1. Create the `.env` file in the `app/` directory.
2. Add the following value to the `.env` file:

```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:4200/
```

Useful Playwright commands:

```bash
npx playwright test --ui
npx playwright show-report
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
