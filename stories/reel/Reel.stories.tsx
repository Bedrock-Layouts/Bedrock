import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Stack } from "../../packages/stack/src/index";
import { Reel } from "../../packages/reel/src/index";

import { colors, ColoredRect } from "./colors";

const installCode = `
yarn add @bedrock-layout/reel
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { Reel } from '@bedrock-layout/reel'
  // or
import { Reel } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/Reel",
  component: Reel,
  args: {
    gutter: "size3",
    snapType: "mandatory",
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
    },
    examples: [],
  },
} satisfies Meta<typeof Reel>;

export default meta;

type Story = StoryObj<typeof Reel>;

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
 * <div data-bedrock-reel='gutter:size3'>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // Or
 *
 * <div data-bedrock-reel style={{'--gutter':'3ch'}}>
 *  <Component />
 *  <Component />
 * </div>
 *
 * // React.js and Solid.js
 * <Reel gutter="size3">
 *  <Component />
 *  <Component />
 * </Reel>
 * ```
 *
 * Here are the possible values for `gutter` by default:
 */
export const Gutter: Story = {
  render: () => {
    return (
      <Stack gutter="size5" style={{ maxInlineSize: "45ch" }}>
        <strong>Custom gutter as number (20)</strong>
        <Reel snapType="none" gutter={20}>
          {colors.slice(0, colors.length / 4).map((color, ind) => {
            return (
              <ColoredRect key={ind} bgColor={color}>
                Lorem ipsum dolor sit amet.{" "}
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>Custom gutter as string ("3ch")</strong>
        <Reel snapType="none" gutter="3ch">
          {colors.slice(0, colors.length / 4).map((color, ind) => {
            return (
              <ColoredRect key={ind} bgColor={color}>
                Lorem ipsum dolor sit amet.{" "}
              </ColoredRect>
            );
          })}
        </Reel>
        <span>
          (There is an issue with gutters rendering in the docs, but they work
          in the playground above. Please see the{" "}
          <a
            href="https://github.com/Bedrock-Layouts/Bedrock/issues/2062"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/Bedrock-Layouts/Bedrock/issues/2062
          </a>{" "}
          for more information.)
        </span>
        {/* {(Object.keys(spacing) as Array<keyof typeof spacing>).map((gutter) => (
          <React.Fragment key={gutter}>
            <strong>{gutter}</strong>
            <Reel gutter={gutter} snapType="none">
              {colors.slice(0, colors.length / 4).map((color, ind) => {
                return (
                  <ColoredRect key={ind} bgColor={color}>
                    Lorem ipsum dolor sit amet.{" "}
                  </ColoredRect>
                );
              })}
            </Reel>
          </React.Fragment>
        ))} */}
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
 * <div data-bedrock-reel='snapType:mandatory'>
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
      <Stack gutter="size5">
        <strong>none</strong>
        <Reel snapType="none" gutter="size3">
          {colors.map((color, i) => {
            return (
              <ColoredRect key={i} bgColor={color} style={{ minWidth: "70vw" }}>
                Lorem ipsum dolor sit amet.
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>mandatory</strong>
        <Reel snapType="mandatory" gutter="size3">
          {colors.map((color, i) => {
            return (
              <ColoredRect key={i} bgColor={color} style={{ minWidth: "70vw" }}>
                Lorem ipsum dolor sit amet.
              </ColoredRect>
            );
          })}
        </Reel>
        <strong>proximity</strong>
        <Reel snapType="proximity" gutter="size3">
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
