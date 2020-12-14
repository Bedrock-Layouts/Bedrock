# `@bedrock-layout/reel`

Layout helper for scrolling content

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to provide convenient scrolling for lists of media (i.e carousel).

## How to install

`npm install @bedrock-layout/reel`

## Usage

```javascript
import Reel from '@bedrock-layout/reel';

<Reel maxHeight={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Reel>;
```

## API

| Property  | Description                                  | Type    | Default |
| --------- | -------------------------------------------- | ------- | ------- |
| maxHeight | maximum height of container                  | number  | N/A     |
| maxWidth  | maximum width of container                   | number  | N/A     |
| snapX     | controls horizontal snap and center position | boolean | false   |
| proximity | allows for snapping only near item edges     | boolean | false   |
