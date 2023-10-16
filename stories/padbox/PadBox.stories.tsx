import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Stack } from "../../packages/stack/src/index";
import { PadBox } from "../../packages/padbox/src/index";
import { spacing } from "../../packages/spacing-constants/src/index";

const installCode = `
yarn add @bedrock-layout/padbox
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { PadBox } from '@bedrock-layout/padbox'
  // or
import { PadBox } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Wrapper Components/PadBox",
  component: PadBox,
  argTypes: {
    padding: {
      table: {
        type: {
          summary: [
            "number, CSSLength, SpacingOption",
            "array of valid Padding values",
            "object of valid Padding values",
          ],
        },
      },
    },
  },
  args: {
    padding: "size5",
  },
  render: (args) => {
    return (
      <PadBox style={{ border: "1px solid black" }} {...args}>
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
        }
      </PadBox>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [
      {
        name: "Product Card",
        path: "/?path=/docs/examples-basic--docs#product-card",
      },
      {
        name: "Pricing Plan",
        path: "/?path=/docs/examples-basic--docs#pricing-plan",
      },
      {
        name: "Basic Form",
        path: "/?path=/docs/examples-basic--docs#basic-form",
      },
      {
        name: "Header Sections",
        path: "/?path=/docs/examples-basic--docs#header-sections",
      },
      {
        name: "Aspect Ratio Image Card",
        path: "/?path=/docs/examples-web-dev--docs#ratio-image-card",
      },
    ],
  },
} satisfies Meta<typeof PadBox>;

export default meta;

type Story = StoryObj<typeof PadBox>;

export const Playground: Story = {};

/**
 * The `padding` can take a single value for a consistent box shape padding.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * There is no CSS only equivalent.
 *
 * // React.js and Solid.js
 * <PadBox padding="3ch">
 *  <Component />
 *  <Component />
 * </PadBox>
 * ```
 *
 * Here are the possible values for `padding` by default:
 */
export const Basic: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>Custom gutter as number (20)</strong>
        <PadBox style={{ border: "1px solid black" }} padding={20}>
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        <strong>Custom gutter as string ("3ch")</strong>
        <PadBox style={{ border: "1px solid black" }} padding="3ch">
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        {(Object.keys(spacing) as Array<keyof typeof spacing>).map(
          (padding) => (
            <React.Fragment key={padding}>
              <strong>{padding}</strong>
              <PadBox style={{ border: "1px solid black" }} padding={padding}>
                {
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
                }
              </PadBox>
            </React.Fragment>
          ),
        )}
      </Stack>
    );
  },
};

/**
 * The `padding` can take an array that follows the [padding short hand rules](https://developer.mozilla.org/en-US/docs/Web/CSS/padding).
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * There is no CSS only equivalent.
 *
 * // React.js and Solid.js
 * <PadBox padding={["size2", "size7"]}>
 *  <Component />
 *  <Component />
 * </PadBox>
 * ```
 *
 * Here are the possible values for `padding` by default:
 */
export const WithAnArray: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>With 2 values</strong>
        <pre>["size2", "size7"]</pre>
        <PadBox
          style={{ border: "1px solid black" }}
          padding={["size2", "size7"]}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        <strong>With 3 values</strong>
        <pre>["size3", "size1", "size7"]</pre>
        <PadBox
          style={{ border: "1px solid black" }}
          padding={["size3", "size1", "size7"]}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        <strong>With 4 values</strong>
        <pre>["size3", "size0", "size1", "size7"]</pre>
        <PadBox
          style={{ border: "1px solid black" }}
          padding={["size3", "size0", "size1", "size7"]}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        <strong>With 4 mixed custom values</strong>
        <pre>[20, "size0", "3ch", "size7"]</pre>
        <PadBox
          style={{ border: "1px solid black" }}
          padding={[20, "size0", "3ch", "size7"]}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
      </Stack>
    );
  },
};

/**
 * The `padding` prop can also take an object to specify which locations will have padding and of which type.
 * You can pass either traditional properties like `top, bottom, right, left`, or logical properties in camelcase such as `blockStart, blockEnd, inlineStart, inlineEnd`.
 * No matter which properties are given, logical properties are used.
 *
 * #### Usage examples
 * ```jsx
 * // CSS
 * There is no CSS only equivalent.
 *
 * // React.js and Solid.js
 * <PadBox padding={{ top: 20, inlineEnd: "size7", blockEnd: "3ch" }}>
 *  <Component />
 *  <Component />
 * </PadBox>
 * ```
 *
 * Here are the possible values for `padding` by default:
 */
export const WithAnObject: Story = {
  render: () => {
    return (
      <Stack gutter="size5">
        <strong>With an object of values</strong>

        <pre>
          <code>
            {JSON.stringify(
              { top: "size3", inlineEnd: "size7", blockEnd: "size1" },
              null,
              3,
            )}
          </code>
        </pre>

        <PadBox
          style={{ border: "1px solid black" }}
          padding={{ top: "size3", inlineEnd: "size7", blockEnd: "size1" }}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
        <strong>With an object of mixed custom values</strong>

        <pre>
          <code>
            {JSON.stringify(
              { top: 20, inlineEnd: "size7", blockEnd: "3ch" },
              null,
              3,
            )}
          </code>
        </pre>

        <PadBox
          style={{ border: "1px solid black" }}
          padding={{ top: 20, inlineEnd: "size7", blockEnd: "3ch" }}
        >
          {
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga consequuntur corrupti beatae commodi vitae, perspiciatis totam provident architecto doloribus aperiam sapiente, incidunt nihil suscipit voluptatibus tempore est dolor! Iusto, vero."
          }
        </PadBox>
      </Stack>
    );
  },
};
