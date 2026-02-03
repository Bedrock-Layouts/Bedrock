# `@bedrock-layout/stack`

A layout helper component that creates a vertical stack layout with gutters (spacing) between each item.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Stack` component literally stacks its child components on top of each other, while maintaining a consistent spacing between them.

---

## How to install

`npm install @bedrock-layout/stack`

or

`yarn add @bedrock-layout/stack`

---

## Usage

```javascript
import { Stack } from "@bedrock-layout/stack";

<Stack gap="size3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Stack>;
```

---

## data-attribute

For styling purposes, you can select `data-br-stack`.

---

## API

\* required

| Property |                 Description                 |                   Type                    |  Default  |
| :------: | :-----------------------------------------: | :---------------------------------------: | :-------: |
|  gap\*   | Sets the space between each child component |             one of `Spacing`              |     -     |
|  align   |  Sets the inline alignment of the children  | `start` \| `end` \| `center` \| `stretch` | `stretch` |
| padding  |        Adds padding inside the Stack        |              `PaddingConfig`              |     -     |
