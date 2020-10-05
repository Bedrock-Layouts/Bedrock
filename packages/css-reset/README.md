# `@bedrock-layout/css-reset`

A CSS Reset that compliments well with the Bedrock Layout Primitives

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## When to Use

When you don't have your own CSS reset.

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

### CSS Stylesheet

You can also just bring in the CSS Stylesheet directly from the `lib` folder:

```javascript
import "@bedrock-layout/css-reset/lib/reset.css";
```
