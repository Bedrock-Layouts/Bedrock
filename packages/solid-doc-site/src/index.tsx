/* eslint-disable react/style-prop-object */
import "@bedrock-layout/css/lib/reset.min.css";
import "@bedrock-layout/css/lib/bedrock-layout.min.css";
import "open-props/style";
import "highlight.js/styles/atom-one-dark.css";

import "./global-styles.css";

import { Center, Cover } from "@bedrock-layout/solid";
import { Router } from "@solidjs/router";
/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";

render(
  () => (
    <Router>
      <Center
        data-app-boundary
        style="background-color: white; min-inline-size:min(min-content, 100%);"
        maxWidth={1680}
      >
        <Cover variant="stretch-content">
          <App />
        </Cover>
      </Center>
    </Router>
  ),
  document.getElementById("root") as HTMLElement,
);
