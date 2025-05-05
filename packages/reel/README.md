# `@bedrock-layout/reel`

A layout helper for scrolling content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

`Reel` component designs and organizes your content into scrollable flatlists, A.K.A Carousels. It also adds convenient breakpoints in the flatlists, hence providing a natural way to scroll through content.

---

## How to install

`npm install @bedrock-layout/reel`

or

`yarn add @bedrock-layout/reel`

## Usage

```javascript
import { Reel } from "@bedrock-layout/reel";

<Reel gutter="size3" snapType="mandatory">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Reel>;
```

---

## data-attribute

For styling purposes, you can select `data-br-reel`.

---

## API

\* required

| Property |                Description                |                Type                | Default |
| :------: | :---------------------------------------: | :--------------------------------: | :-----: |
| gutter\* | Sets the space between each child element |        one of `Spacing`\*\*        |    -    |
| snapType |       Controls horizontal snap type       | `none`, `mandatory` or `proximity` | 'none'  |

\*\* By default, `Spacing` is one of [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but it can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
