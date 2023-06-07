# cocktail-culturel-extension

## Add some cultural content into youtube

[![Build](https://github.com/MathildeRab/CocktailCulturelExtension/actions/workflows/build.yml/badge.svg)](https://github.com/MathildeRab/CocktailCulturelExtension/actions/workflows/build.yml)

## Usage Notes

Download the release and install the extension through the extension manager of your web browser

## Project Setup

```sh
npm install
```

## Commands

### Build

#### Development, HMR

Hot Module Reloading is used to load changes inline without requiring extension rebuilds and extension/page reloads

```sh
npm run dev
```

#### Development, Watch

Rebuilds extension on file changes. Requires a reload of the extension (and page reload if using content scripts)

```sh
npm run watch
```

#### Production

Minifies and optimizes extension build

```sh
npm run build
```

### Load extension in browser

Loads the contents of the dist directory into the specified browser

```sh
npm run serve:chrome
```

```sh
npm run serve:firefox
```
