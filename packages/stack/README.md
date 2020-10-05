# `@bedrock-layout/stack`

Layout helper that creates vertical stack with gutters

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a stacked layouts

## How to install

`npm install @bedrock-layout/stack`

## Usage

```javascript
import Stack from '@bedrock-layout/stack';

<Stack>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Stack>;
```

## API

| Property | Description                                      | Type    | Default |
| -------- | ------------------------------------------------ | ------- | ------- |
| gutter   | sets the gutters (margin) inbetween each element | `"none" | "xs"    | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"` | `lg` |
