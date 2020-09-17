import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import PadBox from "../src";

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

    it("renders default padding", () => {
      const padbox = create(
        <PadBox>
          <Lorem />
        </PadBox>
      );
      expect(padbox.toJSON()).toMatchSnapshot();
    });

    it("renders all the padding options", () => {
      Object.keys(spacing).forEach((padding) => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("use 1, 2, 3, 4 items arrays", () => {
      [
        ["md"],
        ["md", "lg"],
        ["md", "lg", "xs"],
        ["md", "lg", "xs", "sm"],
      ].forEach((padding) => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("use padding object", () => {
      window.CSS.supports.mockReturnValue(true);
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
          </PadBox>
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const stack = create(
        <ThemeProvider theme={{ spacing: { md: "200px" } }}>
          <PadBox>
            <Lorem />
          </PadBox>
        </ThemeProvider>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("renders with classic css properties for old browser", () => {
      window.CSS.supports.mockReturnValue(false);

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
        const padbox = create(<PadBox padding={padding} />);
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("incorrect usage", () => {
    let originalError;
    let spy;

    beforeEach(() => {
      originalError = console.error;
      spy = jest.fn();
      console.error = spy;
    });

    afterEach(() => {
      console.error = originalError;
    });

    it("renders default with console error with wrong input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding="incorrect">
          <Lorem />
        </PadBox>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with console error with wrong input in array", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding={["incorrect", "incorrect"]}>
          <Lorem />
        </PadBox>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with console error with wrong input in object", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <PadBox padding={{ incorrect: "incorrect" }}>
          <Lorem />
        </PadBox>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("throws if more than 4 items in array", () => {
      const padding = ["xs", "xs", "xs", "xs", "xs"];

      expect(() =>
        create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>
        )
      ).toThrow();
    });
  });
});
