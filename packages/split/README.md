# `@bedrock-layout/split`

A layout primitive that creates a split view of various fractional amounts

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a split layouts

## How to install

`npm install @bedrock-layout/split`

## Usage

```javascript
import { Split } from '@bedrock-layout/split';

<Split gutter='lg' fraction='2/3'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Split>;
```

## data-attribute

For purposes of styling, you can select `data-bedrock-layout-split`.

## API

\* required

| Property | Description                                           | Type                                                                | Default |
| -------- | ----------------------------------------------------- | ------------------------------------------------------------------- | ------- |
| gutter\* | sets space between each element                       | one of spacing\*\*                                                  | -       |
| fraction | sets the fractional split                             | `'auto-start' , 'auto-end' , '1/4' , '1/3' , '1/2' , '2/3' , '3/4'` | `1/2`   |
| fraction | sets the fractional split                             | `'auto-start' , 'auto-end' , '1/4' , '1/3' , '1/2' , '2/3' , '3/4'` | `1/2`   |
| switchAt | sets the width threshold that the split will switchAt | a number in pixels or valid CSS length as a string                  | -       |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
