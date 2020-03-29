# `@bedrock-layout/split`

Layout helper that creates Split view of various fractional amounts

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

| Property | Description                       | Type                                                       | Default                               |
| -------- | --------------------------------- | ---------------------------------------------------------- | ------------------------------------- |
| gutter   | sets space inbetween each element | `"none" | "xs" | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"` | `md`                                  |
| fraction | sets the fractional split         | number                                                     | breakPoints.smallOnly or '39.9375rem' |
