import React from "react";
import { create } from "react-test-renderer";
import Frame from "../src";

describe("Frame", () => {
  describe("correct usage", () => {
    test("Frame is not null", () => {
      expect(Frame).toBeTruthy();
    });

    it("renders with ratio", () => {
      const frame = create(
        <Frame ratio={[16, 9]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );
      expect(frame.toJSON()).toMatchSnapshot();
    });

    it("renders custom position", () => {
      const frame = create(
        <Frame ratio={[16, 9]} position="top left">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );
      expect(frame.toJSON()).toMatchSnapshot();
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

    it("renders default position with incorrect value", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame ratio={[16, 9]} position={true}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders ratio of 1:1 with error if no ratio provided", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders ratio of 1:1 with error if ratio is not an array", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame ratio={{ 0: 16, 1: 9 }}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of length <1 provided", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame ratio={[16]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of length >2 provided", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame ratio={[16, 9, 8, 6]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of not numbers provided", () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Frame ratio={["16", "9"]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
