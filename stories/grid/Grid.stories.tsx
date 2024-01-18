import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Grid } from "../../packages/grid/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
yarn add @bedrock-layout/grid
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { Grid } from '@bedrock-layout/grid'
  // or
import { Grid } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/Grid",
  component: Grid,
  args: {
    gutter: "size3",
    minItemWidth: "25rem",
  },
  argTypes,
  render: (args) => {
    return (
      <Grid {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </Grid>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [],
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

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
 * <div data-bedrock-grid='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // OR
 *
 * <div data-bedrock-grid style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Grid gutter="3ch">
 *  <Component />
 *  <Component />
 * </Grid>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 * (The `minItemWidth` is set to `25rem` in all the examples)
 */
export const Gutter: Story = {
  render: (args) => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Grid gutter={20} {...args}>
          <Component />
          <Component />
          <Component />
        </Grid>
        <strong>Custom gutter as string ("3ch")</strong>
        <Grid gutter="3ch" {...args}>
          <Component />
          <Component />
          <Component />
        </Grid>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Grid gutter={gutter} {...args}>
              <Component />
              <Component />
              <Component />
            </Grid>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `minItemWidth` prop defines the width basis of each of the children.
 * The `Grid` will the optimize how many columns and rows are needed based on that value.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-grid style={{--minItemWidth: '30ch'}}>
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Grid minItemWidth="30ch">
 *   <Component />
 *   <Component />
 * </Grid>
 * ```
 *
 * In the below example, The `minItemWidth` is set to `15rem`. As you resize the
 * window, the Grid will recalculate and potentially change the count of columns and rows.
 *
 * (Resize window to observe the changes)
 */
export const MinItemWidth: Story = {
  render: () => {
    return (
      <Grid gutter="size3" minItemWidth="15rem">
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </Grid>
    );
  },
};
