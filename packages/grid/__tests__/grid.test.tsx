import { ThemeProvider, spacing } from "@bedrock-layout/spacing-constants";
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

    it("renders default with no gutter", () => {
      const grid = create(
        <Grid>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gutter) => {
        const grid = create(
          <Grid gutter={gutter}>
            <Lorem />
          </Grid>,
        );
        expect(grid.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gutter with number", () => {
      const grid = create(
        <Grid gutter={20}>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter with string", () => {
      const grid = create(
        <Grid gutter="3ch">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth", () => {
      const grid = create(
        <Grid gutter="size3" minItemWidth={320}>
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders custom minItemWidth as string", () => {
      const grid = create(
        <Grid gutter="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders masonry variant", () => {
      const grid = create(
        <Grid variant="masonry" gutter="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const grid = create(
        <ThemeProvider
          theme={{
            breakPoints: { smallOnly: 320 },
            spacing: { "1x": "200px" },
          }}
        >
          {/** @ts-ignore */}
          <Grid gutter="1x">
            <Lorem />
          </Grid>
        </ThemeProvider>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gutter input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gutter={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with minItemWidth input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gutter="size3" minItemWidth={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error when minItemWidth is not valid CSSLength", () => {
      const errorStack = create(
        // @ts-expect-error
        <Grid gutter="size3" minItemWidth="garbage">
          <Lorem />
        </Grid>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders grid if anything used as variant other than `masonry`", () => {
      const grid = create(
        // @ts-expect-error
        <Grid variant="incorrect" gutter="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });
  });
});
