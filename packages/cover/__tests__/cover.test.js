import { sizes, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { Cover } from "../src";

const Lorem = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
    vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus neque
    sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum sollicitudin
    elit ac nunc scelerisque rhoncus. Nulla felis sapien, condimentum ut
    imperdiet vel, aliquet id ante. Pellentesque habitant morbi tristique
    senectus et netus et malesuada fames ac turpis egestas. Quisque ultrices,
    quam nec scelerisque malesuada, lectus elit semper diam, ac placerat purus
    tortor et enim.
  </p>
);

describe("Cover", () => {
  describe("correct usage", () => {
    test("Cover is not null", () => {
      expect(Cover).toBeTruthy();
    });

    it("renders default", () => {
      const cover = create(
        <Cover gutter="lg">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders custom height", () => {
      const cover = create(
        <Cover gutter="lg" minHeight="500px">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });
    it("renders with top", () => {
      const cover = create(
        <Cover gutter="lg" top={<Lorem />}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with bottom", () => {
      const cover = create(
        <Cover gutter="lg" bottom={<Lorem />}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with top and bottom", () => {
      const cover = create(
        <Cover gutter="lg" top={<Lorem />} bottom={<Lorem />}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders default gutter when none provided", () => {
      const cover = create(
        <Cover>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const cover = create(
          <Cover gutter={gutter}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with custom gutter as number", () => {
      const cover = create(
        <Cover gutter={20}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom gutter as string", () => {
      const cover = create(
        <Cover gutter="3ch">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as string", () => {
      const cover = create(
        <Cover gutter="lg" minHeight="50vh">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as custom property", () => {
      const cover = create(
        <Cover gutter="lg" minHeight="var(--size-xl)">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as number", () => {
      const cover = create(
        <Cover gutter="lg" minHeight={300}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with minHeight as a size property", () => {
      Object.keys(sizes).forEach((size) => {
        const cover = create(
          <Cover gutter="lg" minHeight={size}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with stretched content", () => {
      const cover = create(
        <Cover gutter="lg" stretchContent>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const cover = create(
        <ThemeProvider theme={{ spacing: { "1x": 200 } }}>
          <Cover gutter="1x">
            <Lorem />
          </Cover>
        </ThemeProvider>
      );
      expect(cover.toJSON()).toMatchSnapshot();
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

    it("renders default with wrong gutter", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Cover gutter={{ value: "incorrect" }}>
          <Lorem />
        </Cover>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with min-height incorrect with invalid minHeight", () => {
      const errorStack = create(
        <Cover gutter="lg" minHeight="incorrect">
          <Lorem />
        </Cover>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders without stretched conent with invalid stretchContent prop", () => {
      const errorStack = create(
        <Cover gutter="lg" stretchContent="incorrect">
          <Lorem />
        </Cover>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
