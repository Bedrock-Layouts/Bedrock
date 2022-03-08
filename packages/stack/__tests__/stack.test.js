import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { Stack } from "../src";

const Lorem = () => (
  <>
    {Array.from(Array(4).keys()).map((i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
        vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
        neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
        sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
        condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Quisque ultrices, quam nec scelerisque malesuada, lectus elit semper
        diam, ac placerat purus tortor et enim.
      </p>
    ))}
  </>
);

describe("Stack", () => {
  describe("correct usage", () => {
    test("Stack is not null", () => {
      expect(Stack).toBeTruthy();
    });

    it("renders 0px default with no gutter provided", () => {
      const stack = create(
        <Stack>
          <Lorem />
        </Stack>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const stack = create(
          <Stack gutter={gutter}>
            <Lorem />
          </Stack>
        );
        expect(stack.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gutter with number", () => {
      const stack = create(
        <Stack gutter={20}>
          <Lorem />
        </Stack>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders cutom gutter with string", () => {
      const stack = create(
        <Stack gutter="3ch">
          <Lorem />
        </Stack>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const stack = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <Stack gutter="1x">
            <Lorem />
          </Stack>
        </ThemeProvider>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides using 'space' as key", () => {
      const stack = create(
        <ThemeProvider theme={{ space: { "1x": "200px" } }}>
          <Stack gutter="1x">
            <Lorem />
          </Stack>
        </ThemeProvider>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders 0px with theme overrides", () => {
      const stack = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <Stack gutter="lg">
            <Lorem />
          </Stack>
        </ThemeProvider>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      jest.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("renders default with wrong gutter value", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Stack gutter={{ value: "incorrect" }}>
          <Lorem />
        </Stack>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
