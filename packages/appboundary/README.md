# `@bedrock-layout/appboundary`

A layout helper component that clamps the app at the `XXL` breakpoint and keeps the app centered on the screen.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

Use `AppBoundary` when you want to control the width of the application on larger screens.

---

## How to install

`npm install @bedrock-layout/appboundary`

or

`yarn add @bedrock-laylock/appboundary`

---

## Usage

```javascript
import { AppBoundary } from '@bedrock-layout/appboundary';

<AppBoundary>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</AppBoundary>;
```

---

## data-attribute

For styling purposes, you can select `data-bedrock-appboundary`.

---

## API

| Property     | Description                               | Type               | Default   |
| :----------: | :---------------------------------------: | :------------:     | :-------: |
| boundarySize | Sets the max inline size of the component | One of `Sizes`\*\* | xxlarge   |

\*\* `Sizes` value can be one of: `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`


