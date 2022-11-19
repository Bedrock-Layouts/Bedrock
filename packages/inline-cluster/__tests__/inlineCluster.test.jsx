import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { vi } from "vitest";

import { InlineCluster } from "../src";

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

describe("InlineCluster", () => {
  describe("correct usage", () => {
    test("InlineCluster is not null", () => {
      expect(InlineCluster).toBeTruthy();
    });

    it("renders default gutter when none provided", () => {
      const inlineCluster = create(
        <InlineCluster>
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const inlineCluster = create(
          <InlineCluster gutter={gutter}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gutter as number", () => {
      const inlineCluster = create(
        <InlineCluster gutter={20}>
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter as string", () => {
      const inlineCluster = create(
        <InlineCluster gutter="3ch">
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("renders all the justify options", () => {
      ["start", "center", "end"].forEach((justify) => {
        const inlineCluster = create(
          <InlineCluster gutter="size3" justify={justify}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the align options", () => {
      ["start", "center", "end", "stretch"].forEach((align) => {
        const inlineCluster = create(
          <InlineCluster gutter="size3" align={align}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const inlineCluster = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <InlineCluster gutter="1x">
            <Lorem />
          </InlineCluster>
        </ThemeProvider>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides using numbers", () => {
      const inlineCluster = create(
        <ThemeProvider theme={{ spacing: { none: 0 } }}>
          <InlineCluster gutter="size000">
            <Lorem />
          </InlineCluster>
        </ThemeProvider>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("accepts className prop", () => {
      const inlineCluster = create(
        <InlineCluster gutter="size3" className="CLASSNAME">
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      vi.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("renders default with wrong gutter input", () => {
      const errorStack = create(
        <InlineCluster gutter={{ value: "incorrect" }}>
          <Lorem />
        </InlineCluster>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect justify", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster gutter="size3" justify="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders default with console error with incorrect align", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster gutter="size3" align="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
