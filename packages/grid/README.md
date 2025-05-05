# `@bedrock-layout/grid`

Grid is a layout helper that creates a responsive grid of items.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

`Grid` can be used to create a responsive grid layouts that can automatically wrap depending on the number of child elements and a `minItemWidth` value.

---

## How to install

`npm install @bedrock-layout/grid`

or

`yarn add @bedrock-layout/grid`

---

## Usage

```javascript
import { Grid } from "@bedrock-layout/grid";

<Grid minItemWidth={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Grid>;
```

---

## data-attribute

For styling purposes, you can select `data-br-grid`.

---

## API

\* required

|   Property   |                  Description                  |                  Type                  |    Default    |
| :----------: | :-------------------------------------------: | :------------------------------------: | :-----------: |
|   gutter\*   |   sets the space between each child element   |          One of `Spacing`\*\*          |       -       |
| minItemWidth | sets the min width size of each child element | number or valid CSS length as a string | small (639px) |

\*\* By default, `Spacing` is one of [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
