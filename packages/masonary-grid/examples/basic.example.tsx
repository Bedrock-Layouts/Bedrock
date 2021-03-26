import MasonaryGrid from "@bedrock-layout/masonary-grid";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;
BorderedBox.displayName = "BorderedBox";

const title = "MasonaryGrid";
const name = "Basic";

function Example(args: Record<string, unknown>): React.ReactNode {
  return (
    <MasonaryGrid {...args}>
      <BorderedBox>
        1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        2. Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
        elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
        eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum est
        vitae rutrum elementum. Donec dictum ex ac nibh auctor semper. Phasellus
        sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
        sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
        ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
        nisi tellus, sit amet sagittis nisl luctus ut.
      </BorderedBox>
      <BorderedBox>
        3. Aenean pulvinar sed turpis sagittis dapibus. Proin id nunc felis.
        Donec porttitor magna id metus lacinia, quis posuere est ultrices. Cras
        et massa eu nulla elementum porttitor. Vestibulum sapien nunc, finibus a
        molestie vitae, mattis et lectus. Aenean hendrerit bibendum turpis. Ut
        auctor in nulla non dapibus. Pellentesque velit arcu, molestie sed
        consectetur euismod, semper nec elit. Pellentesque quis ullamcorper
        felis. Donec quis ex euismod, malesuada ex et, hendrerit lectus. Integer
        accumsan sollicitudin accumsan. Aliquam nec ante viverra, congue ipsum
        tincidunt, auctor eros. Morbi tempor eget dolor et hendrerit. Donec eget
        placerat lorem. Phasellus a accumsan odio.
      </BorderedBox>
      <BorderedBox>
        4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        5. Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
        elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
        eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum est
        vitae rutrum elementum. Donec dictum ex ac nibh auctor semper. Phasellus
        sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
        sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
        ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
        nisi tellus, sit amet sagittis nisl luctus ut.
      </BorderedBox>
      <BorderedBox>
        6. Aenean pulvinar sed turpis sagittis dapibus. Proin id nunc felis.
        Donec porttitor magna id metus lacinia, quis posuere est ultrices. Cras
        et massa eu nulla elementum porttitor. Vestibulum sapien nunc, finibus a
        molestie vitae, mattis et lectus. Aenean hendrerit bibendum turpis. Ut
        auctor in nulla non dapibus. Pellentesque velit arcu, molestie sed
        consectetur euismod, semper nec elit. Pellentesque quis ullamcorper
        felis. Donec quis ex euismod, malesuada ex et, hendrerit lectus. Integer
        accumsan sollicitudin accumsan. Aliquam nec ante viverra, congue ipsum
        tincidunt, auctor eros. Morbi tempor eget dolor et hendrerit. Donec eget
        placerat lorem. Phasellus a accumsan odio.
      </BorderedBox>
      <BorderedBox>
        7. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur corrupti beatae commodi vitae, perspiciatis totam provident
        architecto doloribus aperiam sapiente, incidunt nihil suscipit
        voluptatibus tempore est dolor! Iusto, vero.
      </BorderedBox>
      <BorderedBox>
        8. Nulla luctus nisl nec dui auctor volutpat. Phasellus condimentum
        elementum enim in pharetra. Curabitur eget urna cursus, imperdiet leo
        eu, elementum leo. Proin laoreet eleifend nisl ut iaculis. Ut dictum est
        vitae rutrum elementum. Donec dictum ex ac nibh auctor semper. Phasellus
        sed rhoncus arcu, eu consectetur ipsum. Ut dictum a elit at
        sollicitudin. Quisque sed augue molestie, auctor purus quis, luctus
        ipsum. Donec ultrices vel nisi vehicula facilisis. Vestibulum cursus
        nisi tellus, sit amet sagittis nisl luctus ut.
      </BorderedBox>
    </MasonaryGrid>
  );
}

Example.story = { name };
Example.args = { gutter: "lg", minItemWidth: "30rem" };
export const Comp = Example;
export default {
  title,
};
