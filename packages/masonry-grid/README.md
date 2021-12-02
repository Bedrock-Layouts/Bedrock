# `@bedrock-layout/masonry-grid`

MasonryGrid is a layout helper component that creates a grid layout where each child component's vertical space can grow independently.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `MasonryGrid` component is similar to the `Grid` component, where they both create a grid layout for its child components. Except in `MasonryGrid`, each child component's vertical space will grow independent of each other. 

`MasonryGrid` will still use the `minItemWidth` prop to optimize the number of columns, but it will not create standard rows. Instead, it will try to provide the most dense layout, based on the space available.

---

## How to install

`npm install @bedrock-layout/masonry-grid`

or

`yarn add @bedrock-layout/masonry-grid`

---

## Usage

```javascript
import { MasonryGrid } from '@bedrock-layout/masonry-grid';

<MasonryGrid minItemWidth={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</MasonryGrid>;
```

---
## data-attribute

For styling purposes, you can select `data-bedrock-masonry-grid`.

## API

\* required

| Property     | Description                               | Type                                   | Default               |
| :----------: | :---------------------------------------: | :------------------------------------: | :-------------------: |
| gutter\*     | Sets the space between each child element | one of `Spacing`\*\*                   | -                     |
| minItemWidth | minimum width of each child element       | number or valid CSS length as a string | small (639px)         |

\*\* By default, `Spacing` is one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `styled-components`
