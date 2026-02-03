import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

import { Grid } from "../src";

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

describe("Grid", () => {
  describe("correct usage", () => {
    test("Grid is not null", () => {
      expect(Grid).toBeTruthy();
    });

    it("renders default with no gap", () => {
      const grid = create(
        <Grid>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const grid = create(
          <Grid gap={gap}>
            <Lorem />
          </Grid>,
        );
        expect(grid.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gap with number", () => {
      const grid = create(
        <Grid gap={20}>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom gap with string", () => {
      const grid = create(
        <Grid gap="3ch">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth", () => {
      const grid = create(
        <Grid gap="size3" minItemWidth={320}>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth as string", () => {
      const grid = create(
        <Grid gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders masonry variant", () => {
      const grid = create(
        <Grid variant="masonry" gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const grid = create(
        <>
          {/** @ts-ignore */}
          <Grid gap="1x">
            <Lorem />
          </Grid>
        </>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gap={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with minItemWidth input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gap="size3" minItemWidth={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error when minItemWidth is not valid CSSLength", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gap="size3" minItemWidth="garbage">
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders grid if anything used as variant other than `masonry`", () => {
      const grid = create(
        // @ts-expect-error
        <Grid variant="incorrect" gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });
  });
});
