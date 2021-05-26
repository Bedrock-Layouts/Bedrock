# DEPRECATION WARNING

This package is deprecated and will no longer be maintained. All the functionality has been added to the `Split` and `Columns` components, respectively. It is recommended that you use those components going forward.

## `@bedrock-layout/switcher`

The switchers are layout primitive that start as either a `Split` or `Columns` primitive but will switch to a `Stack` when the container size is below the `switchAt` value.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

It is used to create a split or a column layout that will stack at a certain container width.

## How to install

`npm install @bedrock-layout/switcher`

## Usage

```javascript
import { SplitSwitcher, ColumnsSwitcher } from '@bedrock-layout/switcher';

<SplitSwitcher gutter='lg' fraction='2/3'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</SplitSwitcher>

<ColumnsSwitcher gutter='lg' columns={4}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</ColumnsSwitcher>
```

## data-attribute

For purposes of styling, you can select `data-bedrock-layout-columns-switcher` and `data-bedrock-layout-split-switcher`.

## API

### SplitSwitcher

\* required

| Property | Description                     | Type                                   | Default               |
| -------- | ------------------------------- | -------------------------------------- | --------------------- |
| gutter\* | sets space between each element | one of spacing\*\*                     | -                     |
| fraction | sets the fractional split       | `test`                                 | `1/2`                 |
| switchAt | sets the width that             | number or valid CSS length as a string | breakPoints.smallOnly |

### ColumnsSwitcher

\* required

| Property | Description                               | Type                                   | Default               |
| -------- | ----------------------------------------- | -------------------------------------- | --------------------- |
| gutter\* | sets space between each element           | one of spacing\*\*                     | -                     |
| columns  | number of columns                         | number                                 | 1                     |
| dense    | used with `Column` to have a dense layout | boolean                                | false                 |
| switchAt | sets the width that                       | number or valid CSS length as a string | breakPoints.smallOnly |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
