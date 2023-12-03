import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Stack } from "../../packages/stack/src/index";
import { AppBoundary } from "../../packages/appboundary/src/index";
import { Component } from "./Component";
import { argTypes } from "./argTypes";

const installCode = `
yarn add @bedrock-layout/appboundary
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { AppBoundary } from @bedrock-layout/appboundary
  // or
import { AppBoundary } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Wrapper Components/AppBoundary",
  component: AppBoundary,
  args: {
    boundarySize: "sizeXxl",
  },
  argTypes,
  render: (args) => {
    return (
      <AppBoundary {...args}>
        <Component />
        <Component />
      </AppBoundary>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [],
  },
} satisfies Meta<typeof AppBoundary>;

export default meta;

type Story = StoryObj<typeof AppBoundary>;

export const Playground: Story = {};

/**
 * The `boundarySize` prop defines the boundary size of the content.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * <AppBoundary boundarySize="xxLarge">
 *  <App />
 * </AppBoundary>
 * ```
 *
 * Here are the possible values for `boundarySize` by default:
 */
export const BoundarySize: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Default (xxlarge size)</strong>
        <AppBoundary>
          <Component />
        </AppBoundary>
        <strong>Custom boundary size as a number (320)</strong>
        <AppBoundary boundarySize={320}>
          <Component />
        </AppBoundary>
        <strong>Custom boundary size as a string (60ch)</strong>
        <AppBoundary boundarySize="60ch">
          <Component />
        </AppBoundary>
        <strong>sizeXxs</strong>
        <AppBoundary boundarySize="sizeXxs">
          <Component />
        </AppBoundary>
        <strong>sizeXs</strong>
        <AppBoundary boundarySize="sizeXs">
          <Component />
        </AppBoundary>
        <strong>sizeSm</strong>
        <AppBoundary boundarySize="sizeSm">
          <Component />
        </AppBoundary>
        <strong>sizeMd</strong>
        <AppBoundary boundarySize="sizeMd">
          <Component />
        </AppBoundary>
        <strong>sizeLg</strong>
        <AppBoundary boundarySize="sizeLg">
          <Component />
        </AppBoundary>
        <strong>sizeXl</strong>
        <AppBoundary boundarySize="sizeXl">
          <Component />
        </AppBoundary>
        <strong>sizeXxl</strong>
        <AppBoundary boundarySize="sizeXxl">
          <Component />
        </AppBoundary>
        <strong>sizeContent1</strong>
        <AppBoundary boundarySize="sizeContent1">
          <Component />
        </AppBoundary>
        <strong>sizeContent2</strong>
        <AppBoundary boundarySize="sizeContent2">
          <Component />
        </AppBoundary>
        <strong>sizeContent3</strong>
        <AppBoundary boundarySize="sizeContent3">
          <Component />
        </AppBoundary>
        <strong>sizeHeader1</strong>
        <AppBoundary boundarySize="sizeHeader1">
          <Component />
        </AppBoundary>
        <strong>sizeHeader2</strong>
        <AppBoundary boundarySize="sizeHeader2">
          <Component />
        </AppBoundary>
        <strong>sizeHeader3</strong>
        <AppBoundary boundarySize="sizeHeader3">
          <Component />
        </AppBoundary>
      </Stack>
    );
  },
};
