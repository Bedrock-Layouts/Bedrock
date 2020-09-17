import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import Stack from "../src";

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

    it("renders default gutters", () => {
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

    it("renders with theme overrides", () => {
      const stack = create(
        <ThemeProvider theme={{ spacing: { md: "200px" } }}>
          <Stack>
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

    it("renders default with console error with wrong input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Stack gutter="incorrect">
          <Lorem />
        </Stack>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
