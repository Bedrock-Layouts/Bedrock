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
    beforeEach(() => {
      jest.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("renders default position with incorrect value", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame ratio={[16, 9]} position={true}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders ratio of 1:1 with error if no ratio provided", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders ratio of 1:1 with error if ratio is not an array", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame ratio={{ 0: 16, 1: 9 }}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of length <1 provided", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame ratio={[16]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of length >2 provided", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame ratio={[16, 9, 8, 6]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("falls back to 1 with error if array of not numbers provided", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Frame ratio={["16", "9"]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
