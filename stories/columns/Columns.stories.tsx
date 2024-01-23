import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Column, Columns } from "../../packages/columns/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { columnsArgTypes } from "./argTypes";
import { Component } from "./Component";

const installCode = `
## For React.js
yarn add @bedrock-layout/columns
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Columns } from '@bedrock-layout/columns'
  // or
import { Columns } from '@bedrock-layout/primitives'

// For Solid.js
import { Columns } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Columns",
  component: Columns,
  args: {
    gutter: "size3",
    columns: 4,
  },
  argTypes: columnsArgTypes,
  render: (args) => {
    return (
      <Columns {...args}>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </Columns>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/columns.min.css",
    },
    examples: [
      {
        name: "Basic Form",
        path: "/?path=/docs/examples-basic--docs#basic-form",
      },
      {
        name: "12 Span Grid",
        path: "/?path=/docs/examples-web-dev--docs#12-span-grid",
      },
      {
        name: "Pricing Plan",
        path: "/?path=/docs/examples-basic--docs#pricing-plan",
      },
    ],
  },
} satisfies Meta<typeof Columns>;

export default meta;

type Story = StoryObj<typeof Columns>;

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
 * <div data-bedrock-columns='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-bedrock-columns style={{ "--gutter": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Columns gutter="size3">
 *  <Component />
 *  <Component />
 * </Columns>
 *
 * // Or you can use a css value directly
 * <Columns gutter="3ch">
 *  <Component />
 *  <Component />
 * </Columns>
 *
 * // or you can use a custom property
 * <Columns gutter="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Columns>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <Columns gutter={20} columns={4}>
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
        </Columns>
        <strong>Custom gutter as string ("3ch")</strong>
        <Columns gutter="3ch" columns={4}>
          <Component />
          <Component />
          <Component />
          <Component />
          <Component />
        </Columns>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Columns gutter={gutter} columns={4}>
              <Component />
              <Component />
              <Component />
              <Component />
            </Columns>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `columns` prop defines the number of columns in the grid.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-columns style={{ "--columns": 4 }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Columns columns={4}>
 *  <Component />
 *  <Component />
 * </Columns>
 * ```
 *
 * The below example gives us a 4 column layout. By default, each child will take up one column.
 */
export const ColumnsProp: Story = {
  render: () => {
    return (
      <Columns gutter="size3" columns={4}>
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
        <Component />
      </Columns>
    );
  },
};

/**
 * The `span` prop defines the number of columns that a column will span in the grid.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-columns>
 *  <div data-bedrock-column >
 *    <Component />
 *  </div>
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Columns>
 *  <Column span={3}>
 *    <Component />
 *  </Column>
 *  <Component />
 * </Columns>
 * ```
 *
 * Here, the `Column` component is wrapping the blue and green Components.
 * It is then setting the blue Component to span 3 columns and the green to
 * span 2
 */
export const Span: Story = {
  render: () => {
    return (
      <Columns gutter="size3" columns={4}>
        <Component />
        <Component />
        <Column span={3}>
          <Component style={{ background: "blue" }} />
        </Column>
        <Column span={2}>
          <Component style={{ background: "green" }} />
        </Column>
        <Component />
        <Component />
        <Component />
      </Columns>
    );
  },
};

/**
 * The `offsetStart` and `offsetEnd` props define the number of columns that a column will offset from it's neighbors.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-columns>
 *  <div data-bedrock-column style={{ "--offsetStart": 1, "--offsetEnd": 2 }}>
 *    <Component />
 *  </div>
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Columns>
 *  <Column offsetStart={1} offsetEnd={2}>
 *    <Component />
 *  </Column>
 *  <Component />
 * </Columns>
 * ```
 *
 * In the example, the blue Component has `offsetStart` prop with
 * value of 1 and the green Component has an `offsetEnd` prop with
 * value of 2
 */
export const OffsetStartAndOffsetEnd: Story = {
  render: () => {
    return (
      <Columns gutter="size3" columns={5}>
        <Component />
        <Component />
        <Column span={2} offsetStart={1}>
          <Component style={{ background: "blue" }} />
        </Column>
        <Column span={2} offsetEnd={2}>
          <Component style={{ background: "green" }} />
        </Column>
        <Component />
        <Component />
        <Component />
      </Columns>
    );
  },
};

/**
 * The `switchAt` prop defines the breakpoint at which the Columns layout will switch to a Stack layout.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * <div data-bedrock-columns style={{ "--switchAt": 45rem }}>
 *  <div data-bedrock-column>
 *    <Component />
 *  </div>
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Columns>
 *  <Column switchAt="45rem">
 *    <Component />
 *  </Column>
 *  <Component />
 * </Columns>
 * ```
 *
 * The below Columns layout will switch to a Stack layout when its less than `45rem`.
 * (Resize the window to see the effect)
 */
export const SwitchAt: Story = {
  render: () => {
    return (
      <Columns gutter="size3" columns={3} switchAt="45rem">
        <Component />
        <Component />
        <Component />
        <Column span={3}>
          <Component />
        </Column>
      </Columns>
    );
  },
};
