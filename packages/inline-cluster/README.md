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

## data-attribute

For purposes of styling you can select `data-bedrock-inline-cluster`.

## API

\* required

| Property | Description                                          | Type                         | Default |
| -------- | ---------------------------------------------------- | ---------------------------- | ------- |
| gutter\* | sets space between each element                      | one of spacing\*\*           | -       |
| justify  | Inline alignment                                     | One of: `start, end, center` | `start` |
| align    | Block alignment                                      | One of: `start, end, center` | `start` |
| switchAt | The width that the container will switch to stacking | One of: `CSS length, number` | -       |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
