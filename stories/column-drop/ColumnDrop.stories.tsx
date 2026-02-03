import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ColumnDrop } from "../../packages/column-drop/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/column-drop
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { ColumnDrop } from '@bedrock-layout/column-drop'
  // or
import { ColumnDrop } from '@bedrock-layout/primitives'

// For Solid.js
import { ColumnDrop } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/ColumnDrop",
  component: ColumnDrop,
  args: {
    gap: "size3",
  },
  argTypes,
  render: (args) => {
    return (
      <ColumnDrop {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ColumnDrop>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/column-drop.min.css",
    },
    examples: [
      {
        name: "Deconstructed pancake",
        path: "/?path=/docs/examples-web-dev--docs#deconstructed-pancake",
      },
    ],
  },
} satisfies Meta<typeof ColumnDrop>;

export default meta;

type Story = StoryObj<typeof ColumnDrop>;

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
 * <div data-br-column-drop='gap:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-column-drop style={{ "--gap": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <ColumnDrop gap="size3">
 *  <Component />
 *  <Component />
 * </ColumnDrop>
 *
 * // Or you can use a css value directly
 * <ColumnDrop gap="3ch">
 *  <Component />
 *  <Component />
 * </ColumnDrop>
 *
 * // or you can use a custom property
 * <ColumnDrop gap="--custom-size-4">
 *  <Component />
 *  <Component />
 * </ColumnDrop>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const Gap: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>Custom gap as number (20)</strong>
        <ColumnDrop gap={20}>
          <Component />
          <Component />
          <Component />
          <Component />
        </ColumnDrop>
        <strong>Custom gap as string ("3ch")</strong>
        <ColumnDrop gap="3ch">
          <Component />
          <Component />
          <Component />
          <Component />
        </ColumnDrop>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <ColumnDrop gap={gap}>
              <Component />
              <Component />
              <Component />
              <Component />
            </ColumnDrop>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `minItemWidth` prop defines the width basis of each of the children.
 * The `ColumnDrop` will the optimize how many columns and rows are needed based on that value.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * // Using the predefined size constants
 * <div data-br-column-drop="minItemWidth:sizeXs">
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Use the `--min-item-width` custom property
 * <div data-br-column-drop style="--min-item-width: 30ch">
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <ColumnDrop minItemWidth="30ch">
 *   <Component />
 *   <Component />
 * </ColumnDrop>
 * ```
 *
 * In the below example, The `minItemWidth` is set to `15rem`. As you resize the window, the ColumnDrop
 * will recalculate and potentially change the count of columns and rows.
 *
 * (Resize window to observe the changes)
 */
export const MinItemWidth: Story = {
  render: () => {
    return (
      <ColumnDrop gap="size3" minItemWidth="15rem">
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ColumnDrop>
    );
  },
};

/**
 * By default, the column-drop component will stretch the columns to fit the container.
 * If you want to prevent this behavior, you can add the `variant:centered` prop. The `ColumnDrop` will then use the `minItemWidth` prop to determine the width of each column and center the columns on each row.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-br-column-drop='variant:centered'}>
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <ColumnDrop variant='centered'>
 *   <Component />
 *   <Component />
 * </ColumnDrop>
 * ```
 * In the below example, The `minItemWidth` is set to `15rem`. As you resize the window, the ColumnDrop will recalculate and potentially change the count of columns and rows.
 *
 * (Resize window to observe the changes)
 */
export const NoStretchedColumns: Story = {
  render: () => {
    return (
      <ColumnDrop variant="centered" gap="size3" minItemWidth="15rem">
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ColumnDrop>
    );
  },
};

/**
 * The `padding` prop allows you to add padding to the component using the design system spacing scale.
 *
 * #### Usage examples
 * ```jsx
 * // React.js and Solid.js
 * <ColumnDrop padding="size3">
 *  <Component />
 * </ColumnDrop>
 * ```
 */
export const Padding: Story = {
  args: {
    padding: "size3",
  },
  render: (args) => {
    return (
      <ColumnDrop {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </ColumnDrop>
    );
  },
};
