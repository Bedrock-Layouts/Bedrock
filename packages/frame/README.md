# `@bedrock-layout/frame`

Layout helper that frames the content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to frame content on the screen

## How to install

`npm install @bedrock-layout/frame`

## Usage

```javascript
import Frame from '@bedrock-layout/frame';

<Frame>
  <img src='...' />
</Frame>;
```

## API

| Property | Description                                                                               | Type               | Default           |
| -------- | ----------------------------------------------------------------------------------------- | ------------------ | ----------------- |
| ratio    | ratio                                                                                     | `[number, number]` | medium breakpoint |
| position | [object-position value](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) | string             | `50%`             |
