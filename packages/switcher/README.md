# `@bedrock-layout/switcher`

Layout helper that creates Split view of various fractional amounts and switches

## When to Use

Used to create a split layouts

## How to install

`npm install @bedrock-layout/switcher`

## Usage

```javascript
import { SplitSwitcher, ColumnsSwitcher } from '@bedrock-layout/switcher';

<SplitSwitcher fraction='2/3'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</SplitSwitcher>

<ColumnsSwitcher columns={4}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</ColumnsSwitcher>
```

## API

### SplitSwitcher

| Property | Description                       | Type                                                                | Default               |
| -------- | --------------------------------- | ------------------------------------------------------------------- | --------------------- |
| gutter   | sets space inbetween each element | `"none" | "xs" | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"`          | `lg`                  |
| fraction | sets the fractional split         | `'auto-start' | 'auto-end' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4'` | `1/2`                 |
| switchAt | sets the width that               | number                                                              | breakPoints.smallOnly |

### ColumnsSwitcher

| Property | Description                               | Type                                                       | Default               |
| -------- | ----------------------------------------- | ---------------------------------------------------------- | --------------------- |
| gutter   | sets space inbetween each element         | `"none" | "xs" | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"` | `lg`                  |
| columns  | number of columns                         | number                                                     | 1                     |
| dense    | used with `Column` to have a dense layout | boolean                                                    | false                 |
| switchAt | sets the width that                       | number                                                     | breakPoints.smallOnly |
