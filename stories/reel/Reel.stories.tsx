import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Reel } from "../../packages/reel/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";
import { Stack } from "../../packages/stack/src/index";
import { argTypes } from "./argTypes";
import { ColoredRect, colors } from "./colors";

const installCode = `
## For React.js
yarn add @bedrock-layout/reel
  ## or
yarn add @bedrock-layout/primitives

## For Solid.js
yarn add @bedrock-layout/solid
`;

const importCode = `
// For React.js
import { Reel } from '@bedrock-layout/reel'
  // or
import { Reel } from '@bedrock-layout/primitives'

// For Solid.js
import { Reel } from '@bedrock-layout/solid'
`;

const meta = {
  title: "Spacer Components/Reel",
  component: Reel,
  args: {
    gap: "size3",
    snapType: "mandatory",
  },
  argTypes: {
    ...argTypes,
    as: {
      control: "none",
    },
  },
  render: (args) => {
    return (
      <Reel {...args}>
        {colors.map((color, ind) => {
          return (
            <ColoredRect key={ind} bgColor={color} style={{ minWidth: "70vw" }}>
              Lorem ipsum dolor sit amet.
            </ColoredRect>
          );
        })}
      </Reel>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
      cssImport: "@bedrock-layout/css/lib/components/reel.min.css",
    },
    examples: [
      {
        name: "Card Reel",
        path: "/?path=/docs/examples-basic--docs#card-reel",
      },
    ],
  },
} satisfies Meta<typeof Reel>;

export default meta;

type Story = StoryObj<typeof Reel>;

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
 * <div data-br-reel='gap:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or you can use a custom value directly
 * <div data-br-reel style={{ "--gap": "3ch" }}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Reel gap="size3">
 *  <Component />
 *  <Component />
 * </Reel>
 *
 * // Or you can use a css value directly
 * <Reel gap="3ch">
 *  <Component />
 *  <Component />
 * </Reel>
 *
 * // or you can use a custom property
 * <Reel gap="--custom-size-4">
 *  <Component />
 *  <Component />
 * </Reel>
 * ```
 *
 * Here are the possible values for `gap` by default:
 */
export const gap: Story = {
  render: () => {
    return (
      <Stack
        gap="size5"
        style={{
          maxInlineSize: "47ch",
          border: "1px solid black",
          padding: "1rem",
        }}
      >
        <strong>Custom gap as number (20)</strong>
        <Reel snapType="none" gap={20}>
          {colors.map((color, ind) => {
            return (
              <ColoredRect key={ind} bgColor={color}>
                Lorem ipsum dolor sit amet.{" "}
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>Custom gap as string ("3ch")</strong>
        <Reel snapType="none" gap="3ch">
          {colors.map((color, ind) => {
            return (
              <ColoredRect key={ind} bgColor={color}>
                Lorem ipsum dolor sit amet.{" "}
              </ColoredRect>
            );
          })}
        </Reel>

        {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gap) => (
          <React.Fragment key={gap}>
            <strong>{gap}</strong>
            <Reel gap={gap} snapType="none">
              {colors.map((color) => {
                return (
                  <ColoredRect key={color} bgColor={color}>
                    Lorem ipsum dolor sit amet.{" "}
                  </ColoredRect>
                );
              })}
            </Reel>
          </React.Fragment>
        ))}
      </Stack>
    );
  },
};

/**
 * The `snapType` prop defines the scroll snap type.
 *
 * #### Usage examples
 *
 * ```jsx
 * // CSS
 * <div data-br-reel='snapType:mandatory'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Reel snapType="mandatory">
 *  <Component />
 *  <Component />
 * </Reel>
 * ```
 *
 * (scroll to the right to see the next items)
 */
export const SnapType: Story = {
  render: () => {
    return (
      <Stack gap="size5">
        <strong>none</strong>
        <Reel snapType="none" gap="size3">
          {colors.map((color, i) => {
            return (
              <ColoredRect key={i} bgColor={color} style={{ minWidth: "70vw" }}>
                Lorem ipsum dolor sit amet.
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>mandatory</strong>
        <Reel snapType="mandatory" gap="size3">
          {colors.map((color, i) => {
            return (
              <ColoredRect key={i} bgColor={color} style={{ minWidth: "70vw" }}>
                Lorem ipsum dolor sit amet.
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>proximity</strong>
        <Reel snapType="proximity" gap="size3">
          {colors.map((color, i) => {
            return (
              <ColoredRect key={i} bgColor={color} style={{ minWidth: "70vw" }}>
                Lorem ipsum dolor sit amet.
              </ColoredRect>
            );
          })}
        </Reel>
      </Stack>
    );
  },
};
