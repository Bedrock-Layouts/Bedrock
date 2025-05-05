# `@bedrock-layout/frame`

`Frame` is a layout helper that frames the content into the desired aspect ratio.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

---

## When to Use

Use Frame component when you want to crop on-screen content like media into any desired aspect ratio.

---

## How to install

`npm install @bedrock-layout/frame`

or

`yarn add @bedrock-layout/frame`

---

## Usage

```javascript
import { Frame } from "@bedrock-layout/frame";

<Frame>
  <img src="..." />
</Frame>;
```

---

## data-attribute

For styling purposes, you can select `data-br-frame`.

---

## API

∏
| Property | Description | Type | Default |
| :------: | :---------------------------------------------------------------------------------------------------------------------------: | :---------------: | :-------------------: | ----------------- |
| ratio | Aspect ratio that you want the child element to maintain | `[number, number] | ${number}/${number}` | medium breakpoint |
| position | Alignment of the child element. Use [object-position value](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) | string | `50%` |
