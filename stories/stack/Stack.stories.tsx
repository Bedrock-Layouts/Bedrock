import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Stack } from "../../packages/stack/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Component } from "./Component";

const installCode = `
yarn add @bedrock-layout/stack
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { Stack } from '@bedrock-layout/stack'
  // or
import { Stack } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/Stack",
  component: Stack,
  args: {
    gutter: "size3",
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
 * The `gutter` prop defines the gutter size between elements.
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-stack='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or
 *
 * <div data-bedrock-stack style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Stack gutter="3ch">
 *  <Component />
 *  <Component />
 * </Stack>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Stack gutter={20}>
          <Component />
          <Component />
        </Stack>
        <strong>Custom gutter as string ("3ch")</strong>
        <Stack gutter="3ch">
          <Component />
          <Component />
        </Stack>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Stack gutter={gutter}>
              <Component />
              <Component />
            </Stack>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};
