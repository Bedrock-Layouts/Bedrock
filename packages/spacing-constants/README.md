# `@bedrock-layout/spacing-constants`

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

Spacing constants are the standard by which all spacing and layout decisions are made in the Bedrock Layout Primitives. Generally speaking, you won't typically need to pull these in to your App Directly since the Layout Primitives already implement them, but these do exist incase you ever need the raw values.

The spacing is built simply on `1rem` as the starting mid point and then doubling the value at each step above and halfing the value each step below. This comes down to the following spacings: `0`, `0.125rem`, `0.25rem`, `0.5rem`, `1rem`, `2rem`, `4rem`. Each one of these spacing points are then named based on t-shirt size or `none`, `xs`, `sm`, `md`, `lg`, `xl`, and `xxl` respectively.

For the breakpoints, we are adopting the foundation breakpoint values. All values are given in `rems`. There are two types of constants, single value and range values. `medium`, `large`, `xlarge`, and `xxlarge` are intended communicate that size or smaller. The constants are `smallOnly`, `mediumOnly`, `largeOnly`, and `xlargeOnly` and will be an array with the first value being the lowerbound and the second value being the upperbound;.

## Usage

```javascript
import { spacing, breakpoints } from '@bedrock-layout/spacing-constants';

spacing.sm; //0.25rem

breakpoints.large; //64rem
```

## Overriding the values

All of the Bedrock Layout Primitives are built using `styled-components`. In order to override the values of any or all of the constants, you can use the `ThemeProvider` to change the values. The `ThemeProvider` can be rendered at any level of the tree and will override the values at that point. [Check out the docs for `styled-components`](https://styled-components.com/docs/advanced#theming) for more details on how it works

```javascript
import { ThemeProvider } from 'styled-components';

const newSpacings = {
    sm:'45px',
    xxlg:'100ch'
}

<ThemeProvider theme={{spacing:newSpacings}}>
    <Stack gutter="sm">
     {...}
    </Stack>
</ThemeProvider>;
```

### CSS Stylesheet

You can also just bring in the CSS Stylesheet directly from the `lib` folder:

```javascript
import "@bedrock-layout/bedrock-layout-css/lib/spacing-properties.css";

/* or import the minified version */

import "@bedrock-layout/bedrock-layout-css/lib/spacing-properties.min.css";
```

This will add the following custom properties to your stylesheets:

```css
:root {
  --space-none: 0px;
  --space-xxs: 0.0625rem;
  --space-xs: 0.125rem;
  --space-sm: 0.25rem;
  --space-md: 0.5rem;
  --space-mdLg: 0.75rem;
  --space-lg: 1rem;
  --space-lgXl: 1.5rem;
  --space-xl: 2rem;
  --space-xlXXl: 3rem;
  --space-xxl: 4rem;

  --size-xxsmall: 159px;
  --size-xsmall: 319px;
  --size-small: 639px;
  --size-medium: 1023px;
  --size-large: 1199px;
  --size-xlarge: 1439px;
  --size-xxlarge: 1920px;
}
```
