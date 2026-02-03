# `@bedrock-layout/cover`

A layout helper component that covers a predefined height and vertically centers its children.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Cover` component is used to cover a predefined height on the screen and vertically center one child. Use the `CoverCentered` component (or an element with the `data-br-cover-centered` attribute) to mark which child should be centered.

---

## How to install

`npm install @bedrock-layout/cover`

or

`yarn add @bedrock-layout/cover`

---

## Usage

```javascript
import { Cover, CoverCentered } from "@bedrock-layout/cover";

<Cover minHeight="50vh" gap="size2">
  <div>I am on top.</div>
  <CoverCentered>
    <div>I am centered</div>
  </CoverCentered>
  <div>I am on bottom.</div>
</Cover>;
```

---

## data-attribute

For purpose of styling, you can select the outer wrapper as `data-br-cover` data attribute. Use the `CoverCentered` component (or an element with `data-br-cover-centered` attribute) to mark which child should be vertically centered.

---

## API

\* required

### Cover Props

| Property  |                Description                 |                   Type                    |  Default  |
| :-------: | :----------------------------------------: | :---------------------------------------: | :-------: |
| minHeight |      Minimum height you want to cover      | `CSSLength` \| `number` \| `SizesOptions` |   100%    |
|    gap    |         Space between each element         |             One of `Spacing`              |     -     |
|  variant  | Sets the content to stretch to full height |      "default" \| "stretch-content"       | "default" |
|  padding  |       Adds padding inside the Cover        |              `PaddingConfig`              |     -     |

`Spacing` values are the spacing constants (for example: `size000`, `size00`, `size0`, `size1`, ... `size15`).

### CoverCentered

The `CoverCentered` component is used to mark which child should be vertically centered within the Cover. It accepts all standard HTML attributes and can be rendered as any HTML element using the `as` prop.
