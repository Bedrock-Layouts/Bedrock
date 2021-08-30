# `@bedrock-layout/columns`

Layout helper that creates columns of items

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a Columned layouts

## How to install

`npm install @bedrock-layout/columns`

## Usage

### Basic Usage

```javascript
import { Columns } from '@bedrock-layout/columns';

<Columns gutter='lg' columns={5}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Columns>;
```

### Usage with `Column`

```javascript
import { Columns, Column } from '@bedrock-layout/columns';

<Columns gutter='lg' columns={3} dense>
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

## data-attribute

For purposes of styling you can select `data-bedrock-layout-columns` and `data-bedrock-layout-column`.

## API

### Columns

\* required

| Property | Description                               | Type               | Default |
| -------- | ----------------------------------------- | ------------------ | ------- |
| gutter\* | sets space between each element           | one of spacing\*\* | -       |
| columns  | number of columns                         | number             | 1       |
| dense    | used with `Column` to have a dense layout | boolean            | false   |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`

### Column

| Property | Description               | Type   | Default |
| -------- | ------------------------- | ------ | ------- |
| span     | number of columns to span | number | 1       |
