/* eslint-disable react/style-prop-object */
import {
  Center,
  Inline,
  Split,
  Stack,
  createContainerQuery,
} from "@bedrock-layout/solid";
import { Route, Routes } from "@solidjs/router";
import { Component, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { styled } from "solid-styled-components";

import { LogoOnly } from "./components/LogoOnly";
import { CenterPage } from "./pages/CenterPage";
import { ColumnDropPage } from "./pages/ColumnDropPage";
import { ColumnsPage } from "./pages/ColumnsPage";
import { CoverPage } from "./pages/CoverPage";
import { FramePage } from "./pages/FramePage";
import { GridPage } from "./pages/GridPage";
import { InlineClusterPage } from "./pages/InlineClusterPage";
import { InlinePage } from "./pages/InlinePage";
import { LandingPage } from "./pages/LandingPage";
import { ReelPage } from "./pages/ReelPage";
import { SplitPage } from "./pages/SplitPage";
import { StackPage } from "./pages/StackPage";

const WIDTH_BREAKPOINT = 1000;

function SideNavGroup(
  props: Readonly<{
    title: string;
    links: { href: string; name: string }[];
  }>,
) {
  return (
    <Stack gutter="size2">
      <strong>{props.title}</strong>

      <Inline
        gutter="size2"
        switchAt="sizeSm"
        style="padding: var(--spacing-lg) var(--spacing-sm)"
      >
        <For each={props.links}>
          {(link) => <A href={link.href}>{link.name}</A>}
        </For>
      </Inline>
    </Stack>
  );
}

const spacerComponents = [
  { href: "/column-drop", name: "ColumnDrop" },
  { href: "/columns", name: "Columns" },
  { href: "/grid", name: "Grid" },
  { href: "/inline-cluster", name: "InlineCluster" },
  { href: "/inline", name: "Inline" },
  { href: "/reel", name: "Reel" },
  { href: "/split", name: "Split" },
  { href: "/stack", name: "Stack" },
];

const wrapperComponents = [
  { href: "/center", name: "Center" },
  { href: "/cover", name: "Cover" },
  { href: "/frame", name: "Frame" },
];

const LogoLink = styled(A)`
  color: inherit;
  text-decoration: none;
`;

const LogoTitle = styled("strong")`
  font-size: clamp(1rem, 10vw, 2.5rem);
`;

const App: Component = () => {
  const [shouldSwitch, ref] = createContainerQuery(WIDTH_BREAKPOINT);

  return (
    <Split
      ref={ref}
      fraction="auto-start"
      gutter="size3"
      switchAt={WIDTH_BREAKPOINT}
    >
      <div style={`background: var(--stone-1); padding: var(--spacing-size-7);`}>
        <Stack gutter="size7">
          <LogoLink href="/">
            <Inline align="center" gutter="size7">
              <LogoOnly style="max-width:8rem;" />

              <Show when={shouldSwitch() === true}>
                <LogoTitle>Solid-Bedrock</LogoTitle>
              </Show>
            </Inline>
          </LogoLink>
          <SideNavGroup title="Spacer Components" links={spacerComponents} />
          <SideNavGroup title="Wrapper Components" links={wrapperComponents} />
        </Stack>
      </div>

      <Center maxWidth="90%" style="padding: var(--spacing-size-7)">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/column-drop" element={<ColumnDropPage />} />
          <Route path="/columns" element={<ColumnsPage />} />
          <Route path="/grid" element={<GridPage />} />
          <Route path="/inline" element={<InlinePage />} />
          <Route path="/inline-cluster" element={<InlineClusterPage />} />
          <Route path="/reel" element={<ReelPage />} />
          <Route path="/split" element={<SplitPage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="/center" element={<CenterPage />} />
          <Route path="/frame" element={<FramePage />} />
          <Route path="/cover" element={<CoverPage />} />
          <Route
            path="/*all"
            element={
              <Stack gutter="size7" style="padding: var(--spacing-size-7)">
                <h1>Page Not Found</h1>
                <p>
                  Click <A href="/">Home</A> to go back to the site
                </p>
              </Stack>
            }
          />
        </Routes>
      </Center>
    </Split>
  );
};

export default App;
