# `@bedrock-layout/split`

A layout primitive that creates a split layout based on a `fraction` value.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Split` component is used to create a split layout based on a `fraction` value. It enforces spacing between children via the `gap` prop and can switch to a stack layout when the provided threshold is reached.

---

## How to install

`npm install @bedrock-layout/split`

or

`yarn add @bedrock-layout/split`

---

## Usage

```javascript
import { Split } from "@bedrock-layout/split";

<Split gap="size3" fraction="2/3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Split>;
```

---

## data-attribute

For styling purposes, you can select `data-br-split`.

---

## API

\* required

|   Property   |                          Description                          |                                    Type                                    | Default |
| :----------: | :-----------------------------------------------------------: | :------------------------------------------------------------------------: | :-----: |
|    gap\*     |          Sets the space between each child component          |                              one of `Spacing`                              |    -    |
|   fraction   |                   Sets the fractional split                   | one of `'auto-start' , 'auto-end' , '1/4' , '1/3' , '1/2' , '2/3' , '3/4'` |  `1/2`  |
|   switchAt   | Sets the width threshold at which layout will change to Stack |             a number in pixels or valid CSS length as a string             |    -    |
| minItemWidth |          Sets the minimum inline size of each child           |                 `CSSLength` \| `number` \| `SizesOptions`                  |    -    |
|   padding    |                   Adds padding inside Split                   |                              `PaddingConfig`                               |    -    |
