import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/stack
## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Stack } from '@bedrock-layout/stack'
  // or
import { Stack } from '@bedrock-layout/primitives'

// For Solid.js
import { Stack } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Stack",
  component: Stack,
  args: {
    gap: "size3",
  },
  argTypes: {
    ...argTypes,
    as: {
      control: "none",
    },
  },
  render: (args) => {
    return (
      <Stack {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Stack>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout//css/lib/components/stack.min.css",
    },
    examples: [
      {
        name: "Product Card",
        path: "/?path=/docs/examples-basic--docs#product-card",
      },
      {
        name: "Basic Form",
        path: "/?path=/docs/examples-basic--docs#basic-form",
      },
      {
        name: "Pricing Plan",
        path: "/?path=/docs/examples-basic--docs#pricing-plan",
      },
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
      {
        name: "Aspect Ratio Image Card",
        path: "/?path=/docs/examples-web-dev--docs#ratio-image-card",
      },
    ],
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof Stack>;

export const Playground: Story = {};

/**
 * The `gap` prop defines the gap size between elements.
 * Ultimately, the space is controlled by setting the `--gap` CSS variable.
 *
 * #### Default values
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined spacing constants
 * <div data-br-stack='gap:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-stack style={{ "--gap": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Stack gap="size3">
 *  <Component />
 *  <Component />
 * </Stack>
 *
 * // Or you can use a css value directly
 * <Stack gap="3ch">
 *  <Component />
 *  <Component />
 * </Stack>
 *
 * // or you can use a custom property
 * <Stack gap="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Stack>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const gap: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>Custom gap as number (20)</strong>
        <Stack gap={20}>
          <Component />
          <Component />
        </Stack>
        <strong>Custom gap as string ("3ch")</strong>
        <Stack gap="3ch">
          <Component />
          <Component />
        </Stack>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <Stack gap={gap}>
              <Component />
              <Component />
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `align` prop defines the horizontal alignment of the
 * elements within the stack. It accepts the following
 * values: `start`, `end`, `center`, `stretch`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-stack='align:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Stack align="end">
 *  <Component />
 *  <Component />
 * </Stack>
 * ```
 */
export const Align: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>start</strong>
        <Stack align="start" gap="size7">
          <Component />
          <Component />
          <Component />
        </Stack>
        <strong>end</strong>
        <Stack align="end" gap="size7">
          <Component />
          <Component />
          <Component />
        </Stack>
        <strong>center</strong>
        <Stack align="center" gap="size7">
          <Component />
          <Component />
          <Component />
        </Stack>
        <strong>stretch</strong>
        <Stack align="stretch" gap="size7">
          <Component />
          <Component />
          <Component />
        </Stack>
      </Stack>
    );
  },
};

/**
 * The `padding` prop allows you to add padding to the component using the design system spacing scale.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * <Stack padding="size3">
 *  <Component />
 *  <Component />
 * </Stack>
 * ```
 */
export const Padding: Story = {
  args: {
    padding: "size3",
  },
  render: (args) => {
    return (
      <Stack {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
      </Stack>
    );
  },
};
