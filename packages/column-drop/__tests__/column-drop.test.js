import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { ColumnDrop } from "../src";

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

describe("ColumnDrop", () => {
  describe("correct usage", () => {
    test("ColumnDrop is not null", () => {
      expect(ColumnDrop).toBeTruthy();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const columnDrop = create(
          <ColumnDrop gutter={gutter}>
            <Lorem />
          </ColumnDrop>
        );
        expect(columnDrop.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom basis", () => {
      const columnDrop = create(
        <ColumnDrop gutter="lg" basis={320}>
          <Lorem />
        </ColumnDrop>
      );
      expect(columnDrop.toJSON()).toMatchSnapshot();
    });

    it("renders custom basis as string", () => {
      const columnDrop = create(
        <ColumnDrop gutter="lg" basis="32rem">
          <Lorem />
        </ColumnDrop>
      );
      expect(columnDrop.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const grid = create(
        <ThemeProvider
          theme={{
            breakPoints: { smallOnly: 320 },
            spacing: { "1x": "200px" },
          }}
        >
          <ColumnDrop gutter="1x">
            <Lorem />
          </ColumnDrop>
        </ThemeProvider>
      );
      expect(grid.toJSON()).toMatchSnapshot();
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
    it("renders default with console error with no gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <ColumnDrop>
          <Lorem />
        </ColumnDrop>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with wrong gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <ColumnDrop gutter="incorrect">
          <Lorem />
        </ColumnDrop>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders default with console error with basis input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <ColumnDrop gutter="lg" basis={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
