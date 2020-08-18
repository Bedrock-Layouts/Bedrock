# `@bedrock-layout/css-reset`

A CSS Reset that compliments well with the Bedrock Layout Primitives

## When to Use

Used to center content on the screen

## How to install

`npm install @bedrock-layout/css-reset`

## Usage

### CSS Mixin

The reset [mixin](https://styled-components.com/docs/api#css) is best used at the beginning of your global style

```javascript
import { reset } from "@bedrock-layout/css-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;
```

### GlobalStyle

[The `GlobalStyle` component](https://styled-components.com/docs/api#createglobalstyle) is used when you don't have your own global styles to use

```javascript
import { GlobalStyles } from "@bedrock-layout/css-reset";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      {/* The rest of the component */}
    </div>
  );
};
```
