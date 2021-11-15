# `@bedrock-layout/masonry-grid`

Layout helper that creates a Masonry Grid of items

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a masonry grid layouts

## How to install

`npm install @bedrock-layout/masonry-grid`

## Usage

```javascript
import MasonryGrid from '@bedrock-layout/masonry-grid';

<MasonryGrid minItemWidth={300}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</MasonryGrid>;
```

## data-attribute

For purposes of styling you can select `data-bedrock-masonry-grid`.

## API

\* required

| Property     | Description                       | Type                                   | Default               |
| ------------ | --------------------------------- | -------------------------------------- | --------------------- |
| gutter\*     | sets space inbetween each element | one of spacing\*\*                     | -                     |
| minItemWidth | min width in px of each grid item | number or valid CSS length as a string | breakPoints.smallOnly |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
