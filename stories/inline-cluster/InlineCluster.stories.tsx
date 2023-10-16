import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Stack } from "../../packages/stack/src/index";
import { InlineCluster } from "../../packages/inline-cluster/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Component } from "./Component";

const installCode = `
yarn add @bedrock-layout/inline-cluster
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { InlineCluster } from '@bedrock-layout/inline-cluster'
  // or
import { InlineCluster } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/InlineCluster",
  component: InlineCluster,
  args: {
    gutter: "size3",
  },
  render: (args) => {
    return (
      <InlineCluster {...args}>
        <Component widthLevel={5} />
        <Component widthLevel={0.5} />
        <Component />
        <Component widthLevel={4} />
      </InlineCluster>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [],
  },
} satisfies Meta<typeof InlineCluster>;

export default meta;

type Story = StoryObj<typeof InlineCluster>;

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
 * <div data-bedrock-inline-cluster='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // OR
 *
 * <div data-bedrock-inline-cluster style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <InlineCluster gutter="3ch">
 *  <Component />
 *  <Component />
 * </InlineCluster>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <InlineCluster gutter={20}>
          <Component widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
          <Component widthLevel={4} />
        </InlineCluster>
        <strong>Custom gutter as string ("3ch")</strong>
        <InlineCluster gutter="3ch">
          <Component widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
          <Component widthLevel={4} />
        </InlineCluster>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <InlineCluster gutter={gutter}>
              <Component widthLevel={5} />
              <Component widthLevel={0.5} />
              <Component />
              <Component widthLevel={4} />
            </InlineCluster>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `justify` prop defines the inline justification of the
 * elements within the cluster. It accepts the following
 * values: `start`, `end`, `center`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-inline-cluster='justify:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <InlineCluster justify="end">
 *  <Component />
 *  <Component />
 * </InlineCluster>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Justify: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>start</strong>
        <InlineCluster justify="start" gutter="size7">
          <Component widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
          <Component widthLevel={4} />
        </InlineCluster>
        <strong>end</strong>
        <InlineCluster justify="end" gutter="size7">
          <Component widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
          <Component widthLevel={4} />
        </InlineCluster>
        <strong>center</strong>
        <InlineCluster justify="center" gutter="size7">
          <Component widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
          <Component widthLevel={4} />
        </InlineCluster>
      </Stack>
    );
  },
};

/**
 * The `align` prop defines the vertical alignment of the
 * elements within the cluster. It accepts the following
 * values: `start`, `end`, `center`, `stretch`.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-inline-cluster='align:end'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <InlineCluster align="end">
 *  <Component />
 *  <Component />
 * </InlineCluster>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Align: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>start</strong>
        <InlineCluster align="start" gutter="size7">
          <Component style={{ height: 200 }} widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
        </InlineCluster>
        <strong>end</strong>
        <InlineCluster align="end" gutter="size7">
          <Component style={{ height: 200 }} widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
        </InlineCluster>
        <strong>center</strong>
        <InlineCluster align="center" gutter="size7">
          <Component style={{ height: 200 }} widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
        </InlineCluster>
        <strong>stretch</strong>
        <InlineCluster align="stretch" gutter="size7">
          <Component style={{ height: 200 }} widthLevel={5} />
          <Component widthLevel={0.5} />
          <Component />
        </InlineCluster>
      </Stack>
    );
  },
};
