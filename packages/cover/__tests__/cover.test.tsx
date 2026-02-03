import { sizes, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

import { Cover, CoverCentered } from "../src";

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
        <Cover gap="size3">
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders custom height", () => {
      const cover = create(
        <Cover gap="size3" minHeight="500px">
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });
    it("renders with top", () => {
      const cover = create(
        <Cover gap="size3" top={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with bottom", () => {
      const cover = create(
        <Cover gap="size3" bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with top and bottom", () => {
      const cover = create(
        <Cover gap="size3" top={<Lorem />} bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders default gap when none provided", () => {
      const cover = create(
        <Cover>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const cover = create(
          <Cover gap={gap}>
            <Lorem />
          </Cover>,
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with custom gap as number", () => {
      const cover = create(
        <Cover gap={20}>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom gap as string", () => {
      const cover = create(
        <Cover gap="3ch">
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as string", () => {
      const cover = create(
        <Cover gap="size3" minHeight="50vh">
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as custom property", () => {
      const cover = create(
        <Cover gap="size3" minHeight="var(--size-xl)">
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with custom minHeight as number", () => {
      const cover = create(
        <Cover gap="size3" minHeight={300}>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with minHeight as a size property", () => {
      const sizeKeys = Object.keys(sizes) as Array<keyof typeof sizes>;
      sizeKeys.forEach((size) => {
        const cover = create(
          <Cover gap="size3" minHeight={size}>
            <p>{size}</p>
          </Cover>,
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with stretched content", () => {
      const cover = create(
        <Cover gap="size3" stretchContent>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const cover = create(
        <>
          {/* @ts-expect-error */}
          <Cover gap="1x">
            <Lorem />
          </Cover>
        </>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap", () => {
      const errorStack = create(
        // @ts-expect-error
        <Cover gap={{ value: "incorrect" }}>
          <Lorem />
        </Cover>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with min-height incorrect with invalid minHeight", () => {
      const errorStack = create(
        // @ts-expect-error
        <Cover gap="size3" minHeight="incorrect">
          <Lorem />
        </Cover>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders without stretched conent with invalid stretchContent prop", () => {
      const errorStack = create(
        // @ts-expect-error
        <Cover gap="size3" stretchContent="incorrect">
          <Lorem />
        </Cover>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});

describe("CoverCentered", () => {
  describe("correct usage", () => {
    test("CoverCentered is not null", () => {
      expect(CoverCentered).toBeTruthy();
    });

    it("renders default", () => {
      const coverCentered = create(
        <CoverCentered>
          <Lorem />
        </CoverCentered>,
      );
      expect(coverCentered.toJSON()).toMatchSnapshot();
    });

    it("renders with custom element", () => {
      const coverCentered = create(
        <CoverCentered as="section">
          <Lorem />
        </CoverCentered>,
      );
      expect(coverCentered.toJSON()).toMatchSnapshot();
    });

    it("renders within Cover", () => {
      const cover = create(
        <Cover gap="size3">
          <Lorem />
          <CoverCentered>
            <Lorem />
          </CoverCentered>
          <Lorem />
        </Cover>,
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });
  });
});
