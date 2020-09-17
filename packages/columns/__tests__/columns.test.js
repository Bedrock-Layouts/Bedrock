import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import Columns, { Column } from "../src";

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

describe("Column", () => {
  describe("correct usage", () => {
    test("Column is not null", () => {
      expect(Column).toBeTruthy();
    });

    it("renders default gutters", () => {
      const columns = create(
        <Columns>
          <Column>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders custom span", () => {
      const columns = create(
        <Columns>
          <Column span={2}>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
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

    it("renders default with console error with wrong span input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Columns>
          <Column span="incorrect">
            <Lorem />
          </Column>
        </Columns>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given 0", () => {
      const columns = create(
        <Columns>
          <Column span={0}>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given negative number", () => {
      const columns = create(
        <Columns>
          <Column span={-1}>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
  });
});

describe("Columns", () => {
  describe("correct usage", () => {
    test("Columns is not null", () => {
      expect(Columns).toBeTruthy();
    });

    it("renders default gutters", () => {
      const columns = create(
        <Columns>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const columns = create(
          <Columns gutter={gutter}>
            <Lorem />
          </Columns>
        );
        expect(columns.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom columns", () => {
      const columns = create(
        <Columns columns={5}>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders dense mode", () => {
      const columns = create(
        <Columns dense>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const columns = create(
        <ThemeProvider theme={{ spacing: { md: "200px" } }}>
          <Columns>
            <Lorem />
          </Columns>
        </ThemeProvider>
      );
      expect(columns.toJSON()).toMatchSnapshot();
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

    it("renders default with console error with wrong gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Columns gutter="incorrect">
          <Lorem />
        </Columns>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders 1 columns if given 0", () => {
      const columns = create(
        <Columns columns={0}>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders 1 columns if given negative number", () => {
      const columns = create(
        <Columns columns={-1}>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect column type", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Columns columns="incorrect">
          <Lorem />
        </Columns>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect dense type", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Columns dense="incorrect">
          <Lorem />
        </Columns>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
