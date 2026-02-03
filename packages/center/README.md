# `@bedrock-layout/center`

A layout helper component that centers the content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

Use the `Center` component when you want to center content and clamp its width at a predefined value.

---

## How to install

`npm install @bedrock-layout/center`

or

`yarn add @bedrock-layout/center`

---

## Usage

```javascript
import { Center } from "@bedrock-layout/center";

<Center maxWidth="60ch">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Center>;
```

---

## data-attribute

For styling purposes, you can select `data-br-center`.

---

## API

| Property | Description                                                                                                              | Type                                      |     Default     |
| :------: | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- | :-------------: |
| maxWidth | Sets the max-inline size of the component. The maxWidth represents the max-width of the children, not the Center itself. | `CSSLength` \| `number` \| `SizesOptions` | medium (1023px) |
| padding  | Adds padding inside the Center.                                                                                          | `PaddingConfig`                           |        -        |
