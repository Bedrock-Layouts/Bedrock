# `@bedrock-layout/inline-cluster`

InlineCluster is a layout helper component that displays items in a row.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `InclineCluster` component can be used to create inline-cluster layouts where items are displayed in a single row. If the number of items is too large, then they are displayed in a cluster with respect to the container's width and the cluster's justification (start, end, or center).

---

## How to install

`npm install @bedrock-layout/inline-cluster`

or

`yarn add @bedrock-layout/inline-cluster`

---

## Usage

```javascript
import { InlineCluster } from "@bedrock-layout/inline-cluster";

<InlineCLuster gutter="size3" justify="start" align="start">
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</InlineCLuster>;
```

---

## data-attribute

For styling purposes, you can select `data-br-inline-cluster`.

---

## API

\* required

| Property |                  Description                  |             Type             | Default |
| :------: | :-------------------------------------------: | :--------------------------: | :-----: |
| gutter\* |   Sets the space between each child element   |     one of `Spacing`\*\*     |    -    |
| justify  | Sets the inline justification of the children | One of: `start, end, center` | `start` |
|  align   |   Sets the block alignment of the children    | One of: `start, end, center` | `start` |

\*\* By default, `Spacing` is one of [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
