import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ColumnDrop } from "../../packages/column-drop/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
yarn add @bedrock-layout/column-drop
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { ColumnDrop } from '@bedrock-layout/column-drop'
  // or
import { ColumnDrop } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/ColumnDrop",
  component: ColumnDrop,
  args: {
    gutter: "size3",
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
 * The `gutter` prop defines the gutter size between elements.
 * Bedrock has implemented a default spacing scheme,
 * but [it can be overridden using the ThemeProvider provided by `@bedrock-layout/spacing-constants`.](/docs/getting-started-lesson-3-spacing--docs#integrating-with-your-design-system)
 * You can also use any valid CSSLength or positive integer.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-column-drop='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // OR
 *
 * <div data-bedrock-column-drop style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <ColumnDrop gutter="3ch">
 *  <Component />
 *  <Component />
 * </ColumnDrop>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <ColumnDrop gutter={20}>
          <Component />
          <Component />
          <Component />
          <Component />
        </ColumnDrop>
        <strong>Custom gutter as string ("3ch")</strong>
        <ColumnDrop gutter="3ch">
          <Component />
          <Component />
          <Component />
          <Component />
        </ColumnDrop>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <ColumnDrop gutter={gutter}>
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
 * <div data-bedrock-column-drop style={{--minItemWidth: '30ch'}}>
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
 * In the below example, The `minItemWidth` is set to `15rem`. As you resize the window, the Grid
 * will recalculate and potentially change the count of columns and rows.
 *
 * (Resize window to observe the changes)
 */
export const MinItemWidth: Story = {
  render: () => {
    return (
      <ColumnDrop gutter="size3" minItemWidth="15rem">
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
 * If you want to prevent this behavior, you can add the `noStretchedColumns` prop. The `ColumnDrop` will then use the `minItemWidth` prop to determine the width of each column and center the columns on each row.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-column-drop='no-stretched-columns'}>
 *   <Component />
 *   <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <ColumnDrop noStretchedColumns>
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
      <ColumnDrop noStretchedColumns gutter="size3" minItemWidth="15rem">
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
