# `@bedrock-layout/cover`

A layout helper components that covers a pre-defined height and vertically centers its child component.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Cover` component should be used to cover a predefined height on the screen and center its child component.

Please note that `Cover` can only have a single child and will throw an error if you try to add more than one child.

Optionally, you can pass a `top` or `bottom` element as prop to it, and `Cover` will put them above or below the centered element. You can only assign a single ReactNode to both `top` and `bottom` props.

---

## How to install

`npm install @bedrock-layout/cover`

or

`yarn add @bedrock-layout/cover`

---

## Usage

```javascript
import { Cover } from "@bedrock-layout/cover";

<Cover>
  <div>1</div>
</Cover>;
```

---

## data-attribute

For purpose of styling, you can select the outer wrapper as `data-br-cover` data attribute. The `top`, `children`, and `bottom` are wrapped in an element with the data attributes of `data-br-cover-top`, `data-br-cover-child`, and `data-br-cover-bottom` respectively.

---

## API

\* required

| Property  |                      Description                       |                                   Type                                    | Default |
| :-------: | :----------------------------------------------------: | :-----------------------------------------------------------------------: | :-----: |
| minHeight |            minimum height you want to cover            | any valid css size unit as a string (will revert to default if not valid) |  100vh  |
| gutter\*  |               space between each element               |                           One of `Spacing`\*\*                            |    -    |
| children  |              takes a single child element              |                                 ReactNode                                 |    -    |
|    top    | takes a ReactNode and puts it before the child element |                                 ReactNode                                 |    -    |
|  bottom   | takes a ReactNode and puts it after the child element  |                                 ReactNode                                 |    -    |

\*\* By default, `Spacing` is one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`
