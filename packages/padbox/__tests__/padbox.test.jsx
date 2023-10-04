/* eslint-disable no-console */
import { ThemeProvider, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { vi } from "vitest";

import { PadBox } from "../src";

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

describe("PadBox", () => {
  describe("correct usage", () => {
    test("Stack is not null", () => {
      expect(PadBox).toBeTruthy();
    });

    it("renders all the padding options", () => {
      Object.keys(spacing).forEach((padding) => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>,
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("use 1, 2, 3, 4 items arrays", () => {
      [
        ["size2"],
        ["size2", "size3"],
        ["size2", "size3", "size00"],
        ["size2", "size3", "size00", "size1"],
      ].forEach((padding) => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>,
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("use padding object", () => {
      [
        { left: "md" },
        { right: "md" },
        { top: "md" },
        { bottom: "md" },
        { inlineStart: "md" },
        { inlineEnd: "md" },
        { blockStart: "md" },
        { blockEnd: "md" },
      ].forEach((padding) => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>,
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const stack = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <PadBox padding="1x">
            <Lorem />
          </PadBox>
        </ThemeProvider>,
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    let originalError;
    let spy;

    beforeEach(() => {
      originalError = console.error;
      spy = vi.fn();
      console.error = spy;
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("renders default with console error with no input", () => {
      const errorStack = create(
        <PadBox>
          <Lorem />
        </PadBox>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with wrong input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding="incorrect">
          <Lorem />
        </PadBox>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders defaults with wrong input in array", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding={["incorrect", "incorrect"]}>
          <Lorem />
        </PadBox>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders defaults with wrong input in object", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding={{ incorrect: "incorrect", left: "incorrect" }}>
          <Lorem />
        </PadBox>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
