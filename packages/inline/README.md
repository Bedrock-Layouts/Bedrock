# `@bedrock-layout/inline`

Layout helper that creates inline of items

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create a inline layouts

## How to install

`npm install @bedrock-layout/inline`

## Usage

```javascript
import Inline from '@bedrock-layout/inline';

<Inline stretch={1} gutter='lg' justify='start' align='start'>
  <span>Lorem ipsum dolor</span>
  <span>sit amet consectetur</span>
  <span>adipisicing elit.</span>
</Inline>;
```

## data-attribute

For purposes of styling you can select `data-bedrock-layout-inline`.

## API

\* required

| Property | Description                                                 | Type                                          | Default |
| -------- | ----------------------------------------------------------- | --------------------------------------------- | ------- |
| gutter\* | sets space inbetween each element                           | one of spacing\*\*                            | -       |
| stretch  | child or children that will stretch to fill available space | One of: `all, start, end, index of the child` | -       |
| justify  | Inline alignment                                            | One of: `start, end, center`                  | `start` |
| align    | Block alignment                                             | One of: `start, end, center`                  | `start` |
| switchAt | The width that the container will switch to stacking        | One of: `CSS length, number`                  | -       |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
