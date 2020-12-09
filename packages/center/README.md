# `@bedrock-layout/center`

Layout helper that centers the content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to center content on the screen

## How to install

`npm install @bedrock-layout/center`

## Usage

```javascript
import Center from '@bedrock-layout/center';

<Center>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Center>;
```

## API

| Property       | Description             | Type    | Default           |
| -------------- | ----------------------- | ------- | ----------------- |
| maxWidth       | maxWidth of the content | number  | medium breakpoint |
| centerText     | center align text       | boolean | false             |
| centerChildren | centers the children    | boolean | false             |
