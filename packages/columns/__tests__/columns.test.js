import { spacing } from "@bedrock-layout/spacing-constants";
import useContainerQuery from "@bedrock-layout/use-container-query";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { Column, Columns } from "../src";

jest.mock("@bedrock-layout/use-container-query");

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
        <Columns gutter="lg">
          <Column>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders as main", () => {
      const columns = create(
        <Columns gutter="lg" as="main">
          <Column>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders custom span", () => {
      const columns = create(
        <Columns gutter="lg">
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
        <Columns gutter="lg">
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
        <Columns gutter="lg">
          <Column span={0}>
            <Lorem />
          </Column>
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given negative number", () => {
      const columns = create(
        <Columns gutter="lg">
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
        <Columns gutter="lg" columns={5}>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders dense mode", () => {
      const columns = create(
        <Columns gutter="lg" dense>
          <Lorem />
        </Columns>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const columns = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <Columns gutter="1x">
            <Lorem />
          </Columns>
        </ThemeProvider>
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("should render a stack if container is below switchAt", () => {
      const widthToSwitchAt = 600;
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt + 1;
      });

      const stack = create(
        <Columns gutter="lg" switchAt={widthToSwitchAt - 1}>
          <Lorem />
        </Columns>
      );

      expect(stack.toJSON()).toMatchSnapshot();

      useContainerQuery.mockRestore();
    });

    it("should render a columns if container is above switchAt", () => {
      const widthToSwitchAt = 600;
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt + 1;
      });

      const stack = create(
        <Columns gutter="lg" switchAt={widthToSwitchAt + 1}>
          <Lorem />
        </Columns>
      );

      expect(stack.toJSON()).toMatchSnapshot();

      useContainerQuery.mockRestore();
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
        <Columns>
          <Lorem />
        </Columns>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with wrong gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Columns gutter="incorrect">
          <Lorem />
        </Columns>
      );

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

    it("renders default with console error with wrong switchAt input", () => {
      expect(console.error.mock.calls.length).toBe(0);
      const errorStack = create(
        <Columns gutter="lg" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Columns>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
