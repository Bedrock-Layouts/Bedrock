# `@bedrock-layout/column-drop`

Layout helper that creates responsive column-drop layouts.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create responsive column-drop layouts where items wrap to new rows at a minimum width.

## How to install

`npm install @bedrock-layout/column-drop`

## Usage

```javascript
import { ColumnDrop } from "@bedrock-layout/column-drop";

<ColumnDrop gap="size3" minItemWidth="15rem">
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</ColumnDrop>;
```

## data-attribute

For purposes of styling you can select `data-br-column-drop`.

## API

\* required

| Property     | Description                                            | Type                                      | Default   |
| ------------ | ------------------------------------------------------ | ----------------------------------------- | --------- |
| gap          | Sets space between each element                        | one of `Spacing`                          | -         |
| minItemWidth | Sets the minimum width of each child                   | `CSSLength` \| `number` \| `SizesOptions` | -         |
| variant      | Prevent columns from stretching when set to `centered` | `default` \| `centered`                   | `default` |
| padding      | Adds padding inside the ColumnDrop                     | `PaddingConfig`                           | -         |
