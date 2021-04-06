# `@bedrock-layout/stack`

Layout helper that creates vertical stack with gutters

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a stacked layouts

## How to install

`npm install @bedrock-layout/stack`

## Usage

```javascript
import { Stack } from '@bedrock-layout/stack';

<Stack gutter='lg'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Stack>;
```

## data-attribute

For purposes of styling you can select `data-bedrock-layout-stack`.

## API

| Property | Description                                      | Type                                                             | Default |
| -------- | ------------------------------------------------ | ---------------------------------------------------------------- | ------- |
| gutter   | sets the gutters (margin) inbetween each element | one of spacing type. Can be provided by theme or default spacing | -       |

- The spacing types can be found at [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants)
