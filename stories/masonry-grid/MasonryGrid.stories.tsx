import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { MasonryGrid } from "../../packages/masonry-grid/src/index";

const installCode = `
yarn add @bedrock-layout/masonry-grid
  ## or
yarn add @bedrock-layout/primitives
`;

const importCode = `
import { MasonryGrid } from '@bedrock-layout/masonry-grid'
  // or
import { MasonryGrid } from '@bedrock-layout/primitives'
`;

const meta = {
  title: "Spacer Components/MasonryGrid",
  component: MasonryGrid,
  args: {
    gutter: "size3",
    minItemWidth: "15rem",
  },
  render: (args) => {
    return (
      <MasonryGrid {...args}>
        <div>
          1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </div>
        <div>
          2. Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
          elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
          eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum
          est vitae rutrum elementum. Donec dictum ex ac nibh auctor semper.
          Phasellus sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
          sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
          ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
          nisi tellus, sit amet sagittis nisl luctus ut.
        </div>
        <div>
          3. Aenean pulvinar sed turpis sagittis dapibus. Proin id nunc felis.
          Donec porttitor magna id metus lacinia, quis posuere est ultrices.
          Cras et massa eu nulla elementum porttitor. Vestibulum sapien nunc,
          finibus a molestie vitae, mattis et lectus. Aenean hendrerit bibendum
          turpis. Ut auctor in nulla non dapibus. Pellentesque velit arcu,
          molestie sed consectetur euismod, semper nec elit. Pellentesque quis
          ullamcorper felis. Donec quis ex euismod, malesuada ex et, hendrerit
          lectus. Integer accumsan sollicitudin accumsan. Aliquam nec ante
          viverra, congue ipsum tincidunt, auctor eros. Morbi tempor eget dolor
          et hendrerit. Donec eget placerat lorem. Phasellus a accumsan odio.
        </div>
        <div>
          4. Aenean pulvinar sed turpis sagittis dapibus. Proin id nunc felis.
          Donec porttitor magna id metus lacinia, quis posuere est ultrices.
          Cras et massa eu nulla elementum porttitor. Vestibulum sapien nunc,
          finibus a molestie vitae, mattis et lectus. Aenean hendrerit bibendum
          turpis. Ut auctor in nulla non dapibus. Pellentesque velit arcu,
          molestie sed consectetur euismod, semper nec elit. Pellentesque quis
          ullamcorper felis. Donec quis ex euismod, malesuada ex et, hendrerit
          lectus. Integer accumsan sollicitudin accumsan. Aliquam nec ante
          viverra, congue ipsum tincidunt, auctor eros. Morbi tempor eget dolor
          et hendrerit. Donec eget placerat lorem. Phasellus a accumsan odio.
        </div>
        <div>
          5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          consequuntur corrupti beatae commodi vitae, perspiciatis totam
          provident architecto doloribus aperiam sapiente, incidunt nihil
          suscipit voluptatibus tempore est dolor! Iusto, vero.
        </div>
        <div>
          6. Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
          elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
          eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum
          est vitae rutrum elementum. Donec dictum ex ac nibh auctor semper.
          Phasellus sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
          sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
          ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
          nisi tellus, sit amet sagittis nisl luctus ut.
        </div>
      </MasonryGrid>
    );
  },
  parameters: {
    installAndImport: {
      install: installCode,
      import: importCode,
    },
    examples: [],
  },
} satisfies Meta<typeof MasonryGrid>;

export default meta;

type Story = StoryObj<typeof MasonryGrid>;

export const Playground: Story = {};
