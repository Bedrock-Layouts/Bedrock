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

## API

| Property     | Description                       | Type                                   | Default               |
| ------------ | --------------------------------- | -------------------------------------- | --------------------- |
| gutter       | sets space inbetween each element | one of spacings                        | `lg`                  |
| minItemWidth | min width in px of each grid item | number or valid CSS length as a string | breakPoints.smallOnly |

- The spacing and breakPoints can be found at [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants)
