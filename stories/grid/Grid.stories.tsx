import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Grid } from "../../packages/grid/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component, MasonryChildren } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/grid
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Grid } from '@bedrock-layout/grid'
  // or
import { Grid } from '@bedrock-layout/primitives'

// For Solid.js
import { Grid } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Grid",
  component: Grid,
  args: {
    gutter: "size3",
    minItemWidth: "15rem",
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
      cssImport: "@bedrock-layout/css/lib/components/grid.min.css",
    },
    examples: [],
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof Grid>;

export const Playground: Story = {};

/**
 * The `gutter` prop defines the gutter size between elements.
 * Ultimately, the space is controlled by setting the `--gutter` CSS variable.
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
 * <div data-bedrock-grid='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-bedrock-grid style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Grid gutter="size3">
 *  <Component />
 *  <Component />
 * </Grid>
 *
 * // Or you can use a css value directly
 * <Grid gutter="3ch">
 *  <Component />
 *  <Component />
 * </Grid>
 *
 * // or you can use a custom property
 * <Grid gutter="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Grid>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  args: {
    minItemWidth: "20rem",
  },
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
 * // Use the `--min-item-width` custom property
 * <div data-bedrock-grid style="--min-item-width: 30ch">
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

export const MinItemWidth: Story = {};

/**
 * The `variant` prop can be set to "grid" or "masonry". The default value is "grid".
 * The `masonry` variant will optimize the layout of the children based on the `minItemWidth` and the available block space.
 *
 * **Note**: The `masonry` variant is a new feature coming to CSS.  It is not supported in all browsers yet. To see if the feature is supported in your browser, check [caniuse.com](https://caniuse.com/mdn-css_properties_grid-template-rows_masonry).
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-grid="variant:masonry" style="--min-item-width: 30ch">
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Grid variant="masonry" minItemWidth="30ch">
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
export const MasonryVariant: Story = {
  args: {
    variant: "masonry",
  },
  render: (args) => {
    return (
      <Grid {...args}>
        <MasonryChildren />
      </Grid>
    );
  },
};
