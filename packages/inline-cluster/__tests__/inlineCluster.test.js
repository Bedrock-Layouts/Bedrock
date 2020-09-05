import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import InlineCluster from "../src";

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
  test("test todo", () => Promise.resolve());
  describe("correct usage", () => {
    test("InlineCluster is not null", () => {
      expect(InlineCluster).toBeTruthy();
    });
    it("renders defaults", () => {
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
    it("renders all the justify options", () => {
      ["start", "center", "end"].forEach((justify) => {
        const inlineCluster = create(
          <InlineCluster justify={justify}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });
    it("renders all the align options", () => {
      ["start", "center", "end"].forEach((align) => {
        const inlineCluster = create(
          <InlineCluster align={align}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const inlineCluster = create(
        <ThemeProvider
          theme={{ breakPoints: { smallOnly: 320 }, spacing: { md: "200px" } }}
        >
          <InlineCluster>
            <Lorem />
          </InlineCluster>
        </ThemeProvider>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("accepts className prop", () => {
      const inlineCluster = create(
        <InlineCluster className="CLASSNAME">
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
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

    it("renders default with console error with wrong gutter input", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <InlineCluster gutter="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect justify", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <InlineCluster justify="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders default with console error with incorrect align", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <InlineCluster align="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
