# `@bedrock-layout/inline-cluster`

InlineCluster is a layout helper component that displays items in a row.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `InlineCluster` component can be used to create inline-cluster layouts where items wrap and cluster based on the container width and the `justify` setting.

---

## How to install

`npm install @bedrock-layout/inline-cluster`

or

`yarn add @bedrock-layout/inline-cluster`

---

## Usage

```javascript
import { InlineCluster } from "@bedrock-layout/inline-cluster";

<InlineCluster gap="size3" justify="start" align="start">
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</InlineCluster>;
```

---

## data-attribute

For styling purposes, you can select `data-br-inline-cluster`.

---

## API

\* required

| Property |                  Description                  |                               Type                                | Default  |
| :------: | :-------------------------------------------: | :---------------------------------------------------------------: | :------: |
| gap\\\*  |   Sets the space between each child element   |                         one of `Spacing`                          |    -     |
| justify  | Sets the inline justification of the children | One of: `start`, `end`, `center`, `space-between`, `space-around` | `start`  |
|  align   |   Sets the block alignment of the children    |            One of: `start`, `end`, `center`, `stretch`            | `center` |
| padding  |    Adds padding inside the inline cluster     |                          `PaddingConfig`                          |    -     |
