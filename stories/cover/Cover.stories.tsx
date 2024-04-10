import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Cover } from "../../packages/cover/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/cover
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Cover } from '@bedrock-layout/cover'
  // or
import { Cover } from '@bedrock-layout/primitives'

// For Solid.js
import { Cover } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Wrapper Components/Cover",
  component: Cover,
  args: {
    minHeight: "50vh",
  },
  argTypes,

  render: (args) => {
    return (
      <Cover {...args} style={{ border: "1px solid black" }}>
        <Component />
      </Cover>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/cover.min.css",
    },
    examples: [
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
    ],
  },
} satisfies Meta<typeof Cover>;

export default meta;

type Story = StoryObj<typeof Cover>;

export const Playground: Story = {};

/**
 * The `top` prop can be used to render a top section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-cover>
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover top={<span>I am on top.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const Top: Story = {
  args: {
    top: <span>I am on top.</span>,
  },
};

/**
 * The `bottom` prop can be used to render a bottom section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-cover>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const Bottom: Story = {
  args: {
    bottom: <span>I am on bottom.</span>,
  },
};

/**
 * Both the `top` and `bottom` props can be used to render
 * a top and bottom section.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-cover>
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const TopAndBottom: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
  },
};

/**
 * The `minHeight` prop can be used to set the minimum height of the cover.
 * The default is `100vh`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Setting the minHeight using the `--min-height` custom property
 * <div data-br-cover style="--min-height: 500px">
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover minHeight="500px" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const MinHeight: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
    minHeight: "500px",
    gap: "size2",
  },
};

/**
 * The `variant` prop can be used to change the cover to a `stretch-content` variant. This variant will make the centered children stretch
 * to fill the available space in the block direction.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-cover="variant:stretch-content">
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover variant="stretch-content" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 */
export const StretchContent: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
    minHeight: "500px",
    gap: "size2",
    variant: "stretch-content",
  },
};

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
 * <div data-br-cover='gap:size3'>
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-cover style={{ "--gap": "3ch" }}>
 *  <span>I am on top.</span>
 *  <div data-br-cover-centered>
 *    <Component />
 *  </div>
 *  <span>I am on bottom.</span>
 * </div>
 *
 * // React.js and Solid.js
 * <Cover gap="size3" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 *
 * // Or you can use a css value directly
 * <Cover gap="3ch" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 *
 * // or you can use a custom property
 * <Cover gap="--custom-size-4" top={<span>I am on top.</span>} bottom={<span>I am on bottom.</span>}>
 *  <Component />
 * </Cover>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const Gap: Story = {
  args: {
    top: <span>I am on top.</span>,
    bottom: <span>I am on bottom.</span>,
    minHeight: 0,
  },
  render: (args) => {
    return (
      <Stack gap="size5">
        <strong>Custom gap as number (20)</strong>
        <Cover gap={20} {...args}>
          <div>I am a child.</div>
        </Cover>
        <strong>Custom gap as string ("3ch")</strong>
        <Cover gap="3ch" {...args}>
          <div>I am a child.</div>
        </Cover>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <Cover gap={gap} {...args}>
              <div>I am a child.</div>
            </Cover>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};
