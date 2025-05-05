# `@bedrock-layout/columns`

A layout helper component that creates an n-column layout.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

The `Columns` can be used to create a columned layout consisting of `n` number of columns.

---

## How to install

`npm install @bedrock-layout/columns`

or

`yarn add @bedrock-layout/columns`

---

## Usage

### Basic Usage

The following example creates a simple columned layout containing `5` columns of equal size.

```javascript
import { Columns } from "@bedrock-layout/columns";

<Columns gutter="size3" columns={5}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Columns>;
```

---

### Usage with `Column`

`@bedrock-layout/columns` also contains a `Column` component which can be used within `Columns` to define individual sizes of the columns, using the `span` props, as shown below:

```javascript
import { Columns, Column } from "@bedrock-layout/columns";

<Columns gutter="size3" columns={3} dense>
  <Column span={2}>
    <div>1</div>
  </Column>
  <Column span={2}>
    <div>2</div>
  </Column>
  <Column>
    <div>3</div>
  </Column>
  <Column span={3}>
    <div>4</div>
  </Column>
  <Column span={2}>
    <div>5</div>
  </Column>
  <Column>
    <div>6</div>
  </Column>
</Columns>;
```

---

## data-attribute

For styling purposes, you can select `data-br-columns` and `data-br-column` for `Columns` and `Column` respectively.

---

## API

### Columns

\* required

| Property |                              Description                               |             Type             | Default |
| :------: | :--------------------------------------------------------------------: | :--------------------------: | :-----: |
| gutter\* |                  sets the space between the elements                   |     One of `Spacing`\*\*     |    -    |
| columns  |                      number of columns to create                       |            number            |    1    |
|  dense   |               used with `Column` to have a dense layout                |           boolean            |  false  |
| switchAt | The width threshold at which the container will switch to stack layout | One of: `CSS length, number` |    -    |

\*\* By default, `Spacings` is one of [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants) values, but this can be overwritten using the `ThemeProvider` from `@bedrock-layout/spacing-constants`

### Column

|  Property   |                  Description                   |  Type  | Default |
| :---------: | :--------------------------------------------: | :----: | :-----: |
|    span     |   number of columns the element should span    | number |    1    |
| offsetStart | number of columns to offset before the element | number |    -    |
|  offsetEnd  | number of columns to offset after the element  | number |    -    |
