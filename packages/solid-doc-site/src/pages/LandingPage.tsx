/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/style-prop-object */
import {
  Center,
  ColumnDrop,
  Cover,
  Inline,
  PadBox,
  Stack,
} from "@bedrock-layout/solid";
import { A } from "@solidjs/router";
import { JSXElement } from "solid-js";
import { styled } from "solid-styled-components";

import { Button } from "../components/Button";
import { LogoOnly } from "../components/LogoOnly";

const Heading = styled("h1")`
  font-size: clamp(2rem, 10vw, 4.5rem);
  font-family: "Roboto", sans-serif;
  text-align: center;
  font-weight: var(--font-weight-4);
  letter-spacing: var(--font-letterspacing-1);
`;

const SubTitle = styled("span")`
  font-size: var(--font-size-fluid-1);
  line-height: 2rem;
`;

export function LandingPage(): JSXElement {
  return (
    <Stack gutter="size9">
      <Hero />
      <PadBox style="background: var(--stone-1)" padding="size7">
        <ColumnDrop
          noStretchedColumns
          minItemWidth="sizeContent3"
          gutter="size7"
        >
          <Stack gutter="size2">
            <h2>Bedrock Layout CSS</h2>
            <p>
              Bedrock Layout Primitives are built using{" "}
              <a
                href="https://www.bedrock-layout.dev/?path=/docs/bedrock-layout-css-a-css-only-version--docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bedrock Layout CSS.
              </a>{" "}
              Just simply import the Bedrock Layout CSS into your app and you're
              ready to go.
            </p>
          </Stack>
          <Stack gutter="size2">
            <h2>Composable Layouts</h2>
            <p>
              Bedrock Layout Primitives are built to allow you to compose them
              together to create your own custom layouts. Many "complex" layouts
              can be created by composing Bedrock Layout Primitives.
            </p>
          </Stack>
          <Stack gutter="size2">
            <h2>Use With Any Design System</h2>
            <p>
              You can use Bedrock Layout Primitives with any design system.
              Bedrock Layout's' spacing scheme can be easily overridden to match
              your design system.
            </p>
          </Stack>
        </ColumnDrop>
      </PadBox>
    </Stack>
  );
}

function Hero() {
  return (
    <Cover as={PadBox} padding="size7" minHeight="60vh">
      <Stack as={Center} gutter="size3">
        <header>
          <Inline stretch="all" gutter="size9" switchAt="40rem">
            <Center maxWidth="20rem">
              <LogoOnly />
            </Center>
            <Center maxWidth="60rem">
              <Stack gutter="size8">
                <Heading id="title">
                  <Stack gutter="size2">
                    SOLID BEDROCK
                    <SubTitle>LAYOUT PRIMITIVES</SubTitle>
                  </Stack>
                </Heading>
                <Center
                  as="p"
                  centerText
                  style="font-size: var(--font-size-fluid-0);"
                >
                  <strong>
                    Foundational layout building blocks for your Solid.js app
                  </strong>
                </Center>
                <Center
                  as="a"
                  centerChildren
                  href="https://github.com/Bedrock-Layouts/Solid-Bedrock/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.shields.io/github/stars/Bedrock-Layouts/Solid-Bedrock?style=social"
                    alt="GitHub Repo stars"
                  />
                </Center>
                <Inline
                  minItemWidth="fit-content"
                  gutter="size3"
                  switchAt="20rem"
                  justify="center"
                >
                  {/* @ts-expect-error */}
                  <Button primary as={A} href="/getting-started">
                    Get Started
                  </Button>
                  <Button
                    as="a"
                    /* @ts-expect-error */
                    href="https://github.com/Bedrock-Layouts/Solid-Bedrock"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                </Inline>
              </Stack>
            </Center>
          </Inline>
        </header>
      </Stack>
    </Cover>
  );
}
