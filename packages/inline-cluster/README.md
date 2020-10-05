# `@bedrock-layout/inline-cluster`

Layout helper that creates inline-cluster of items

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a inline-cluster layouts

## How to install

`npm install @bedrock-layout/inline-cluster`

## Usage

```javascript
import InlineCluster from '@bedrock-layout/inline-cluster';

<InlineCLuster gutter='lg' justify='start' align='start'>
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</InlineCLuster>;
```

## API

| Property | Type                                    | Default |
| -------- | --------------------------------------- | ------- |
| gutter   | One of: `none, xs, sm, md, lg, xl, xxl` | `lg`    |
| justify  | One of: `start, end, center`            | `start` |
| align    | One of: `start, end, center`            | `start` |
