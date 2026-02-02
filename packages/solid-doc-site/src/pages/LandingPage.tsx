/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/style-prop-object */
import {
  Center,
  ColumnDrop,
  Cover,
  Inline,
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
    <Stack gap="size9">
      <Hero />
      <Stack style="background: var(--stone-1); padding: var(--spacing-size-7)">
        <ColumnDrop minItemWidth="sizeContent3">
          <Stack gap="size2">
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
          <Stack gap="size2">
            <h2>Composable Layouts</h2>
            <p>
              Bedrock Layout Primitives are built to allow you to compose them
              together to create your own custom layouts. Many "complex" layouts
              can be created by composing Bedrock Layout Primitives.
            </p>
          </Stack>
          <Stack gap="size2">
            <h2>Use With Any Design System</h2>
            <p>
              You can use Bedrock Layout Primitives with any design system.
              Bedrock Layout's' spacing scheme can be easily overridden to match
              your design system.
            </p>
          </Stack>
        </ColumnDrop>
      </Stack>
    </Stack>
  );
}

function Hero() {
  return (
    <Cover minHeight="60vh" style="padding: var(--spacing-size-7)">
      <Stack as={Center} gap="size3">
        <header>
          <Inline stretch="all" gap="size9" switchAt="40rem">
            <Center maxWidth="20rem">
              <LogoOnly />
            </Center>
            <Center maxWidth="60rem">
              <Stack gap="size8">
                <Heading id="title">
                  <Stack gap="size2">
                    SOLID BEDROCK
                    <SubTitle>LAYOUT PRIMITIVES</SubTitle>
                  </Stack>
                </Heading>
                <Center
                  as="p"
                  style="text-align: center; font-size: var(--font-size-fluid-0);"
                >
                  <strong>
                    Foundational layout building blocks for your Solid.js app
                  </strong>
                </Center>
                <Center
                  as="a"
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
                  gap="size3"
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
