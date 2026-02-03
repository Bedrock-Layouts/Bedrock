import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import imgSrc from "../../.storybook/assets/data-pic.jpg";
import { Frame } from "../../packages/frame/src/index";
import { argTypes } from "./argTypes";

const installCode = `
## For React.js
yarn add @bedrock-layout/frame
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Frame } from '@bedrock-layout/frame'
  // or
import { Frame } from '@bedrock-layout/primitives'

// For Solid.js
import { Frame } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Wrapper Components/Frame",
  component: Frame,
  args: {
    ratio: "16/9",
    children: <img src={imgSrc} alt="computer with data" />,
  },
  argTypes,
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/frame.min.css",
    },
    examples: [
      {
        name: "Product Card",
        path: "/?path=/docs/examples-basic--docs#product-card",
      },
      {
        name: "Avatar",
        path: "/?path=/docs/examples-basic--docs#avatar",
      },
      {
        name: "Aspect Ratio Image Card",
        path: "/?path=/docs/examples-web-dev--docs#ratio-image-card",
      },
    ],
  },
} satisfies Meta<typeof Frame>;

export default meta;

type Story = StoryObj<typeof Frame>;

export const Playground: Story = {};

/**
 * The `ratio` prop takes a string the is in the format
 * of `${number}/${number}`, which represents the ratio of
 * width to height of the desired aspect ratio. The React and Solid
 * components also accept a string value in the format of `${number}:${number}`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-frame style={{ "--ratio": "4/3" }}>
 *   <img src={imgSrc} alt="computer with data" />
 * </div>
 *
 * // React.js and Solid.js
 * <Frame ratio="16/9">
 *  <Component />
 * </Frame>
 * ```
 *
 * In the example below, the frame will maintain a 16:9 aspect ratio and will crop the image to fit.
 */
export const RatioAsString: Story = {
  args: {
    ratio: "16/9",
  },
};

/**
 * The React and Solid components also accept a `ratio` prop
 * as an tuple array of two numbers, which represent the
 * ratio of width to height of the desired aspect ratio.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * <Frame ratio="16/9">
 *  <Component />
 * </Frame>
 * ```
 *
 * In the example below, the frame will maintain a 4:3 aspect ratio and will crop the
 * image to fit, but the image will be positioned at the top-left of the frame.
 */
export const RatioAsArray: Story = {
  args: {
    ratio: [4, 3],
  },
};

/**
 * You can also use the Frame without a ratio. This will
 * allow you to specify the width and height of the frame,
 * while still taking advantage of the cropping functionality.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-frame style={{ height: "50vh", width: "50%" }}>
 *   <img src={imgSrc} alt="computer with data" />
 * </div>
 *
 * // React.js and Solid.js
 * <Frame style={{ height: "50vh", width: "50%" }}>
 *  <Component />
 * </Frame>
 * ```
 *
 * In the example below, the frame's height is set to `50vh` and its width is set to `50%`.
 * The image will be cropped to fit the frame.
 */
export const WithoutAnAspectRatio: Story = {
  args: {
    style: { height: "50vh", width: "50%" },
  },
};

/**
 * The `padding` prop allows you to add padding to the component using the design system spacing scale.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * <Frame padding="size3">
 *  <Component />
 * </Frame>
 * ```
 */
export const Padding: Story = {
  args: {
    padding: "size3",
    ratio: "16/9",
  },
};
