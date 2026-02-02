# `@bedrock-layout/reel`

A layout helper for scrolling content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Reel` component organizes content into a scrollable horizontal list (a carousel). It also adds convenient snap points to make scrolling feel natural.

---

## How to install

`npm install @bedrock-layout/reel`

or

`yarn add @bedrock-layout/reel`

## Usage

```javascript
import { Reel } from "@bedrock-layout/reel";

<Reel gap="size3" snapType="mandatory">
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
|  gap\*   | Sets the space between each child element |          one of `Spacing`          |    -    |
| snapType |       Controls horizontal snap type       | `none`, `mandatory` or `proximity` | 'none'  |
| padding  |       Adds padding inside the Reel        |          `PaddingConfig`           |    -    |
