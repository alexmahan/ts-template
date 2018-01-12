# Ultra minimal TS/SCSS/Webpack template

1. Clone the dang repo.
2. `npm install` on the command line to install dependencies.

## Running dev server
`npm start` to run a dev server on http://localhost:8080

## Building to dist
`npm run-script build` to concatenate and build your JS and CSS to `dist`. This command also copies over anything in `static` (HTML, assets, etc) to the `dist` folder.

## Linting
Uses [TSLint](https://github.com/palantir/tslint) to lint TypeScript, and [StyleLint](https://stylelint.io/) to lint CSS. Linting runs on the fly while the dev server is running. Look to your console for errors, or if you're using VS Code, errors will be highlighted in the editor.
