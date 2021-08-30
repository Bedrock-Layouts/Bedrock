# `@bedrock-layout/reel`

Layout helper for scrolling content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to provide convenient scrolling for lists of media (i.e carousel).

## How to install

`npm install @bedrock-layout/reel`

## Usage

```javascript
import { Reel } from '@bedrock-layout/reel';

<Reel gutter="lg" snapType='mandatory'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Reel>;
```

## data-attribute

For purposes of styling you can select `data-bedrock-layout-reel`.

## API

\* required

| Property | Description                                  | Type               | Default |
| -------- | -------------------------------------------- | ------------------ | ------- |
| gutter\* | sets space inbetween each element            | one of spacing\*\* | -       |
| snapType | controls horizontal snap and center position | string             | 'none'  |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
