# react-json-explorer

A component that renders a formatted JSON and explores its values through key selecting and path text inputs.

## Usage

```ts
const data = {
  timestamp: "2021-10-27T07:49:14.896Z",
  token: 777,
  permissions: ["create", "read", "update", "delete"],
  fields: [
    {
      id: "d1a2d386-8042-48a2-a1dd-d760e2fc09fb",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: true,
      ref: null,
    },
    {
      amount: 7.77,
      hasError: false,
      method: undefined,
    },
  ],
};

<JSONExplorer data={data} />;
```

## Commands

In the project directory, you can run:

### `npm install`

Installs the project dependencies.

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production on the `build` folder.

### `npm run preview`

Runs the `build` in preview mode.

### `npm run deploy`

Publishes the `build` to GitHub Pages using [gh-pages](https://github.com/tschaub/gh-pages).

### `npm run build:dist`

Builds the package for distribution on the `dist` folder.
