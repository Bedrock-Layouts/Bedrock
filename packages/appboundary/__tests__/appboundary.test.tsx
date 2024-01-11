import { ThemeProvider } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

import { AppBoundary } from "../src";

const Lorem = () => {
  return (
    <>
      {Array.from(Array(4).keys()).map((i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
          neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
          sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
          condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Quisque ultrices, quam nec scelerisque malesuada, lectus elit
          semper diam, ac placerat purus tortor et enim.
        </p>
      ))}
    </>
  );
};

describe("AppBoundary", () => {
  describe("correct usage", () => {
    test("AppBoundary is not null", () => {
      expect(AppBoundary).toBeTruthy();
    });

    it("renders default gutters", () => {
      const appboundary = create(
        <AppBoundary>
          <Lorem />
        </AppBoundary>,
      );
      expect(appboundary.toJSON()).toMatchSnapshot();
    });

    const testsCases = [
      [639],
      ["60ch"],
      ["sizeXxs"],
      ["sizeXs"],
      ["sizeSm"],
      ["sizeMd"],
      ["sizeLg"],
      ["sizeXl"],
      ["sizeXxl"],
    ] as const;

    it.each(testsCases)("renders boundarySize", (boundary) => {
      const appboundary = create(
        <AppBoundary boundarySize={boundary}>
          <Lorem />
        </AppBoundary>,
      );
      expect(appboundary.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const appboundary = create(
        <ThemeProvider theme={{ sizes: { ultraWide: 2400 } }}>
          {/* This should be overwritten using declaration merging */}
          {/* @ts-expect-error */}
          <AppBoundary boundarySize="ultraWide">
            <Lorem />
          </AppBoundary>
        </ThemeProvider>,
      );
      expect(appboundary.toJSON()).toMatchSnapshot();
    });
  });
});
