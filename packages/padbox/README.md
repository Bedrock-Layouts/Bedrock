# `@bedrock-layout/padbox`

Layout helper that creates vertical stack with gutters

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to create uniform padding

## How to install

`npm install @bedrock-layout/padbox`

## Usage

```javascript
import Stack from '@bedrock-layout/padbox';

<Padbox>{...content}</Padbox>;
```

## data-attribute

For purposes of styling you can select `data-bedrock-layout-padbox`.

## API

\* required

| Property  | Description  | Type                                                         | Default |
| --------- | ------------ | ------------------------------------------------------------ | ------- |
| padding\* | sets padding | spacing, array of spacings, or object of spacing values \*\* | -       |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/main/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
