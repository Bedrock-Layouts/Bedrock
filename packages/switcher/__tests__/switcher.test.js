import React from "react";
import { create, act } from "react-test-renderer";
import { spacing } from "@bedrock-layout/spacing-constants";
import { ThemeProvider } from "styled-components";
import { SplitSwitcher, ColumnsSwitcher } from "../src";

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

describe("Switcher", () => {
  describe("SplitSwitcher", () => {
    describe("correct usage", () => {
      test("SplitSwitcher is not null", () => {
        expect(SplitSwitcher).toBeTruthy();
      });

      it("renders default gutters", () => {
        const stack = create(
          <SplitSwitcher>
            <Lorem />
          </SplitSwitcher>
        );
        expect(stack.toJSON()).toMatchSnapshot();
      });

      it("renders all the gutter options", () => {
        Object.keys(spacing).forEach((gutter) => {
          const stack = create(
            <SplitSwitcher gutter={gutter}>
              <Lorem />
            </SplitSwitcher>
          );
          expect(stack.toJSON()).toMatchSnapshot();
        });
      });

      it("renders with theme overrides", () => {
        const stack = create(
          <ThemeProvider theme={{ spacing: { md: "200px" } }}>
            <SplitSwitcher>
              <Lorem />
            </SplitSwitcher>
          </ThemeProvider>
        );
        expect(stack.toJSON()).toMatchSnapshot();
      });

      it("forwards the ref", () => {
        const spy = jest.fn();
        act(() => {
          create(
            <SplitSwitcher ref={spy}>
              <Lorem />
            </SplitSwitcher>
          );
        });
        expect(spy).toBeCalled();
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

      it("renders default with console error with wrong input", () => {
        expect(spy.mock.calls.length).toBe(0);

        const errorStack = create(
          <SplitSwitcher gutter="incorrect">
            <Lorem />
          </SplitSwitcher>
        );

        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });

      it("renders default with console error with wrong fraction input", () => {
        expect(spy.mock.calls.length).toBe(0);

        const errorStack = create(
          <SplitSwitcher fraction="incorrect">
            <Lorem />
          </SplitSwitcher>
        );

        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });

      it("renders default with console error with wrong switchAt input", () => {
        expect(spy.mock.calls.length).toBe(0);

        const errorStack = create(
          <SplitSwitcher switchAt="incorrect">
            <Lorem />
          </SplitSwitcher>
        );

        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("ColumnsSwitcher", () => {
    describe("correct usage", () => {
      test("ColumnsSwitcher is not null", () => {
        expect(ColumnsSwitcher).toBeTruthy();
      });

      it("renders default gutters", () => {
        const stack = create(
          <ColumnsSwitcher>
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(stack.toJSON()).toMatchSnapshot();
      });

      it("renders all the gutter options", () => {
        Object.keys(spacing).forEach((gutter) => {
          const stack = create(
            <ColumnsSwitcher gutter={gutter}>
              <Lorem />
            </ColumnsSwitcher>
          );
          expect(stack.toJSON()).toMatchSnapshot();
        });
      });

      it("renders custom columns", () => {
        const columns = create(
          <ColumnsSwitcher columns={5}>
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(columns.toJSON()).toMatchSnapshot();
      });

      it("renders dense mode", () => {
        const columns = create(
          <ColumnsSwitcher dense>
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(columns.toJSON()).toMatchSnapshot();
      });

      it("renders with theme overrides", () => {
        const stack = create(
          <ThemeProvider theme={{ spacing: { md: "200px" } }}>
            <ColumnsSwitcher>
              <Lorem />
            </ColumnsSwitcher>
          </ThemeProvider>
        );
        expect(stack.toJSON()).toMatchSnapshot();
      });

      it("forwards the ref", () => {
        const spy = jest.fn();
        act(() => {
          create(
            <ColumnsSwitcher ref={spy}>
              <Lorem />
            </ColumnsSwitcher>
          );
        });
        expect(spy).toBeCalled();
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
      it("renders default with console error with wrong input", () => {
        expect(spy.mock.calls.length).toBe(0);
        const errorStack = create(
          <ColumnsSwitcher gutter="incorrect">
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });
      it("renders default with console error with wrong columns input", () => {
        expect(spy.mock.calls.length).toBe(0);
        const errorStack = create(
          <ColumnsSwitcher columns="incorrect">
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });
      it("renders default with console error with wrong dense input", () => {
        expect(spy.mock.calls.length).toBe(0);
        const errorStack = create(
          <ColumnsSwitcher dense="incorrect">
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });
      it("renders default with console error with wrong switchAt input", () => {
        expect(spy.mock.calls.length).toBe(0);
        const errorStack = create(
          <ColumnsSwitcher switchAt="incorrect">
            <Lorem />
          </ColumnsSwitcher>
        );
        expect(spy).toBeCalled();
        expect(errorStack.toJSON()).toMatchSnapshot();
      });
    });
  });
});
