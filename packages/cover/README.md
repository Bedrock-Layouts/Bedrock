# `@bedrock-layout/cover`

Layout helper that covers a certain height and vertically center's it's child

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

Used to cover on the screen and center it's child. It takes a single child only and will throw an error if you try to add more than one child.

It will optionally take a `top` and/or a `bottom` element to put above or below the centered element. Both the `top` and `bottom` prop will only take a singluar ReactNode.

## How to install

`npm install @bedrock-layout/cover`

## Usage

```javascript
import { Cover } from '@bedrock-layout/cover';

<Cover>
  <div>1</div>
</Cover>;
```

## data-attribute

For purposes of styling, the outer wrapper as the `data-bedrock-layout-cover` data attribute. The `top`, `children`, and `bottom` are wrapped in an elements with a data attributes of `data-bedrock-layout-cover-top`, `data-bedrock-layout-cover-child`, and `data-bedrock-layout-cover-bottom` respectively.

## API

\* required

| Property  | Description                     | Type                                                                      | Default |
| --------- | ------------------------------- | ------------------------------------------------------------------------- | ------- |
| minHeight | minHeight of the cover          | any valid css size unit as a string (will revert to default if not valid) | "100vh" |
| gutter\*  | sets space between each element | one of spacing\*\*                                                        | -       |
| children  | takes a single child            | ReactNode                                                                 | -       |
| top       | takes a single child            | ReactNode                                                                 | -       |
| bottom    | takes a single child            | ReactNode                                                                 | -       |

\*\* By default, spacings are one of the [spacing-constants](https://github.com/Bedrock-Layouts/Bedrock/tree/master/packages/spacing-constants), but can be overridden using the `ThemeProvider` from `styled-components`
