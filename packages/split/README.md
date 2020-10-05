# `@bedrock-layout/split`

Layout helper that creates Split view of various fractional amounts

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a split layouts

## How to install

`npm install @bedrock-layout/split`

## Usage

```javascript
import Split from '@bedrock-layout/split';

<Split fraction='2/3'>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Split>;
```

## API

| Property | Description                       | Type          | Default    |
| -------- | --------------------------------- | ------------- | ---------- |
| gutter   | sets space inbetween each element | `"none"       | "xs"       | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"` | `lg` |
| fraction | sets the fractional split         | `'auto-start' | 'auto-end' | '1/4' | '1/3' | '1/2' | '2/3' | '3/4'` | `1/2` |
