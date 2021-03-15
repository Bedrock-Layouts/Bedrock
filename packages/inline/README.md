# `@bedrock-layout/inline`

Layout helper that creates inline of items

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a inline layouts

## How to install

`npm install @bedrock-layout/inline`

## Usage

```javascript
import Inline from '@bedrock-layout/inline';

<Inline stretch={1} gutter='lg' justify='start' align='start'>
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</Inline>;
```

## API

| Property | Type                                          | Default |
| -------- | --------------------------------------------- | ------- |
| stretch  | One of: `all, start, end, index of the child` | -       |
| gutter   | One of: `none, xs, sm, md, lg, xl, xxl`       | `lg`    |
| justify  | One of: `start, end, center`                  | `start` |
| align    | One of: `start, end, center`                  | `start` |
| switchAt | One of: `CSS length, number`                  | -       |
