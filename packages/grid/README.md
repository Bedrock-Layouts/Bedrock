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

<Grid gap="size3" minItemWidth={300}>
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

|   Property   |                  Description                  |                   Type                    |    Default    |
| :----------: | :-------------------------------------------: | :---------------------------------------: | :-----------: |
|   gap\\\*    |   Sets the space between each child element   |             One of `Spacing`              |       -       |
| minItemWidth | Sets the min width size of each child element | `CSSLength` \| `number` \| `SizesOptions` | small (639px) |
|   variant    |    Sets the layout to `grid` or `masonry`     |            `grid` \| `masonry`            |    `grid`     |
|   padding    |         Adds padding inside the Grid          |              `PaddingConfig`              |       -       |
