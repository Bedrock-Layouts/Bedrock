import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Cover, CoverCentered } from "../../packages/cover/src/index";
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
import { Cover, CoverCentered } from '@bedrock-layout/cover'
  // or
import { Cover, CoverCentered } from '@bedrock-layout/primitives'

// For Solid.js
import { Cover, CoverCentered } from '@bedrock-layout/solid'
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
        <CoverCentered>
          <Component />
        </CoverCentered>
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
 * The `CoverCentered` component marks which child should be vertically centered.
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
 * <Cover>
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 * </Cover>
 * ```
 */
export const Top: Story = {
  render: () => (
    <Cover style={{ border: "1px solid black" }} minHeight="50vh">
      <span>I am on top.</span>
      <CoverCentered>
        <Component />
      </CoverCentered>
    </Cover>
  ),
};

/**
 * You can have multiple children, with the `CoverCentered` component marking which one is centered.
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
 * <Cover>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 * ```
 */
export const Bottom: Story = {
  render: () => (
    <Cover style={{ border: "1px solid black" }} minHeight="50vh">
      <CoverCentered>
        <Component />
      </CoverCentered>
      <span>I am on bottom.</span>
    </Cover>
  ),
};

/**
 * You can have content before and after the centered element.
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
 * <Cover>
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 * ```
 */
export const TopAndBottom: Story = {
  render: () => (
    <Cover style={{ border: "1px solid black" }} minHeight="50vh">
      <span>I am on top.</span>
      <CoverCentered>
        <Component />
      </CoverCentered>
      <span>I am on bottom.</span>
    </Cover>
  ),
};

/**
 * The `minHeight` prop can be used to set the minimum height of the cover.
 * The default is `100%`.
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
 * <Cover minHeight="500px">
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 * ```
 */
export const MinHeight: Story = {
  render: () => (
    <Cover style={{ border: "1px solid black" }} minHeight="500px" gap="size2">
      <span>I am on top.</span>
      <CoverCentered>
        <Component />
      </CoverCentered>
      <span>I am on bottom.</span>
    </Cover>
  ),
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
 * <Cover variant="stretch-content">
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 * ```
 */
export const StretchContent: Story = {
  render: () => (
    <Cover
      style={{ border: "1px solid black" }}
      minHeight="500px"
      gap="size2"
      variant="stretch-content"
    >
      <span>I am on top.</span>
      <CoverCentered>
        <Component />
      </CoverCentered>
      <span>I am on bottom.</span>
    </Cover>
  ),
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
 * <Cover gap="size3">
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 *
 * // Or you can use a css value directly
 * <Cover gap="3ch">
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 *
 * // or you can use a custom property
 * <Cover gap="--custom-size-4">
 *  <span>I am on top.</span>
 *  <CoverCentered>
 *    <Component />
 *  </CoverCentered>
 *  <span>I am on bottom.</span>
 * </Cover>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const Gap: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>Custom gap as number (20)</strong>
        <Cover gap={20} minHeight={0}>
          <span>I am on top.</span>
          <CoverCentered>
            <div>I am a child.</div>
          </CoverCentered>
          <span>I am on bottom.</span>
        </Cover>
        <strong>Custom gap as string ("3ch")</strong>
        <Cover gap="3ch" minHeight={0}>
          <span>I am on top.</span>
          <CoverCentered>
            <div>I am a child.</div>
          </CoverCentered>
          <span>I am on bottom.</span>
        </Cover>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <Cover gap={gap} minHeight={0}>
              <span>I am on top.</span>
              <CoverCentered>
                <div>I am a child.</div>
              </CoverCentered>
              <span>I am on bottom.</span>
            </Cover>
          </React.Fragment>
        ))}
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
 * <Cover padding="size3">
 *  <Component />
 * </Cover>
 * ```
 */
export const Padding: Story = {
  args: {
    padding: "size3",
    minHeight: "20rem",
  },
  render: (args) => {
    return (
      <Cover {...args}>
        <Component />
      </Cover>
    );
  },
};
