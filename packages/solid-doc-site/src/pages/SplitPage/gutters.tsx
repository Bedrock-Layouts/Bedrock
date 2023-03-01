import { Split } from "@bedrock-layout/solid";
import { JSXElement } from "solid-js";

import { Box as Component } from "../../components/Box";

export function Gutter(): JSXElement {
  return (
    <>
      <h3>{"size000"}</h3>
      <Split gutter="size000" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size00"}</h3>
      <Split gutter="size00" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size1"}</h3>
      <Split gutter="size1" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size2"}</h3>
      <Split gutter="size2" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size3"}</h3>
      <Split gutter="size3" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size4"}</h3>
      <Split gutter="size4" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size5"}</h3>
      <Split gutter="size5" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size6"}</h3>
      <Split gutter="size6" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size7"}</h3>
      <Split gutter="size7" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size8"}</h3>
      <Split gutter="size8" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size9"}</h3>
      <Split gutter="size9" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size10"}</h3>
      <Split gutter="size10" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size11"}</h3>
      <Split gutter="size11" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size12"}</h3>
      <Split gutter="size12" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size13"}</h3>
      <Split gutter="size13" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size14"}</h3>
      <Split gutter="size14" fraction="1/2">
        <Component />
        <Component />
      </Split>
      <h3>{"size15"}</h3>
      <Split gutter="size15" fraction="1/2">
        <Component />
        <Component />
      </Split>
    </>
  );
}
