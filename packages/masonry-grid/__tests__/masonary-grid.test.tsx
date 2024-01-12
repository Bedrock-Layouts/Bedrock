import { ThemeProvider, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

import { MasonryGrid } from "../src";

describe("MasonryGrid", () => {
  describe("correct usage", () => {
    test("MasonryGrid is not null", () => {
      expect(MasonryGrid).toBeTruthy();
    });

    it("renders all the gutter options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gutter) => {
        const masonryGrid = create(
          <MasonryGrid gutter={gutter}>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </MasonryGrid>,
        );

        expect(masonryGrid.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom minItemWidth", () => {
      const masonryGrid = create(
        <MasonryGrid gutter="size3" minItemWidth={320}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>,
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth as string", () => {
      const masonryGrid = create(
        <MasonryGrid gutter="size3" minItemWidth="32rem">
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>,
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const masonryGrid = create(
        <ThemeProvider
          theme={{
            space: { "1x": "200px" },
          }}
        >
          {/* @ts-expect-error */}
          <MasonryGrid gutter="1x">
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </MasonryGrid>
        </ThemeProvider>,
      );
      expect(masonryGrid.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with console error with no gutter input", () => {
      const errorStack = create(
        <MasonryGrid>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with wrong gutter input", () => {
      const errorStack = create(
        // @ts-expect-error
        <MasonryGrid gutter="incorrect">
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with minItemWidth input", () => {
      const errorStack = create(
        // @ts-expect-error
        <MasonryGrid gutter="size3" minItemWidth={{ value: "incorrect" }}>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </MasonryGrid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
