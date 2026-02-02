# `@bedrock-layout/spacing-constants`

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

Spacing constants are the standard by which all spacing and layout decisions are made in the Bedrock Layout Primitives. They are the building blocks of the system and are used to create all other spacing values.

Bedrock Layout's spacing constants are based on the [Open-props size scale](https://open-props.style/#sizes).

## Spacing constants

```js
{
  space:{
    size000: "-.5rem",
    size00: "-.25rem",
    size1: ".25rem",
    size2: ".5rem",
    size3: "1rem",
    size4: "1.25rem",
    size5: "1.5rem",
    size6: "1.75rem",
    size7: "2rem",
    size8: "3rem",
    size9: "4rem",
    size10: "5rem",
    size11: "7.5rem",
    size12: "10rem",
    size13: "15rem",
    size14: "20rem",
    size15: "30rem",
  },
  sizes: {
    sizeContent1: "20ch",
    sizeContent2: "45ch",
    sizeContent3: "60ch",
    sizeHeader1: "20ch",
    sizeHeader2: "25ch",
    sizeHeader3: "35ch",
    sizeXxs: "240px",
    sizeXs: "360px",
    sizeSm: "480px",
    sizeMd: "768px",
    sizeLg: "1024px",
    sizeXl: "1440px",
    sizeXxl: "1920px",
  }
}
```

## Using CSS Custom Properties

The spacing constants (e.g., `size3`) can be used as string values directly in the `gap` and `padding` props. Alternatively, you can use CSS custom properties by wrapping them in `var()`. The library provides CSS custom properties for each spacing value, with names transformed from camelCase to kebab-case (e.g., `size3` → `--size-3`).

You can use CSS custom properties with the `gap` prop like this:

```typescript
  <Stack gap="var(--size-3)">
    {...}
  </Stack>
```

Or with the `padding` prop:

```typescript
  <Stack padding="var(--size-3)">
    {...}
  </Stack>
```

## No spacing in your design system

In a perfect world we would only work on applications that have a well defined spacing system. However, there are many applications that do not have a well defined spacing system. For these applications, you can use any positive integer or valid `CSSLength` value for the spacing values.
