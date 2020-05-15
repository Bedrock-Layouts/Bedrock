# `@bedrock-layout/cover`

Layout helper that covers a certain height and vertically center's it's child

## When to Use

Used to cover on the screen and center it's child

It will optionally take a top and/or a bottom element to put above or below the centered element

## How to install

`npm install @bedrock-layout/cover`

## Usage

```javascript
import Cover from '@bedrock-layout/cover';

<Cover>
  <div>1</div>
</Cover>;
```

## API

| Property  | Description                       | Type                                                       | Default |
| --------- | --------------------------------- | ---------------------------------------------------------- | ------- |
| children  | takes a single child              | ReactNode                                                  | -       |
| minHeight | minHeight of the cover            | any valid css size unit as a string                        | "100vh" |
| gutter    | sets space inbetween each element | `"none" | "xs" | "sm" | "md" | "lg" | "lg" | "xl" | "xxl"` | `lg`    |
