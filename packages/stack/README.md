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

<Stack gutter="size3">
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

| Property |                 Description                 |         Type         | Default |
| :------: | :-----------------------------------------: | :------------------: | :-----: |
| gutter\* | Sets the space between each child component | one of `Spacing`\*\* |    -    |

\*\* By default, `Spacing` is one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
