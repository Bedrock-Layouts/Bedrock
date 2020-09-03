import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import Grid from "../src";

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

    it("renders default gutters", () => {
      const grid = create(
        <Grid>
          <Lorem />
        </Grid>
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const grid = create(
          <Grid gutter={gutter}>
            <Lorem />
          </Grid>
        );
        expect(grid.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom minItemWidth", () => {
      const grid = create(
        <Grid minItemWidth={320}>
          <Lorem />
        </Grid>
      );
      expect(grid.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const grid = create(
        <ThemeProvider
          theme={{ breakPoints: { smallOnly: 320 }, spacing: { md: "200px" } }}
        >
          <Grid>
            <Lorem />
          </Grid>
        </ThemeProvider>
      );
      expect(grid.toJSON()).toMatchSnapshot();
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
        <Grid gutter="incorrect">
          <Lorem />
        </Grid>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with minItemWidth input", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Grid minItemWidth="incorrect">
          <Lorem />
        </Grid>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
