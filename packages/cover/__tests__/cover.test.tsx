import { sizes, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
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
      const { container } = render(
        <Cover gap="size3">
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom height", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="500px">
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders with top", () => {
      const { container } = render(
        <Cover gap="size3" top={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with bottom", () => {
      const { container } = render(
        <Cover gap="size3" bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with top and bottom", () => {
      const { container } = render(
        <Cover gap="size3" top={<Lorem />} bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders default gap when none provided", () => {
      const { container } = render(
        <Cover>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Cover gap={gap}>
            <Lorem />
          </Cover>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders with custom gap as number", () => {
      const { container } = render(
        <Cover gap={20}>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with custom gap as string", () => {
      const { container } = render(
        <Cover gap="3ch">
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with custom minHeight as string", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="50vh">
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with custom minHeight as custom property", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="var(--size-xl)">
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with custom minHeight as number", () => {
      const { container } = render(
        <Cover gap="size3" minHeight={300}>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with minHeight as a size property", () => {
      const sizeKeys = Object.keys(sizes) as Array<keyof typeof sizes>;
      sizeKeys.forEach((size) => {
        const { container } = render(
          <Cover gap="size3" minHeight={size}>
            <p>{size}</p>
          </Cover>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders with stretched content", () => {
      const { container } = render(
        <Cover gap="size3" stretchContent>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <Cover gap="1x">
            <Lorem />
          </Cover>
        </>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap={{ value: "incorrect" }}>
          <Lorem />
        </Cover>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders with min-height incorrect with invalid minHeight", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap="size3" minHeight="incorrect">
          <Lorem />
        </Cover>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders without stretched conent with invalid stretchContent prop", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap="size3" stretchContent="incorrect">
          <Lorem />
        </Cover>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});

describe("CoverCentered", () => {
  describe("correct usage", () => {
    test("CoverCentered is not null", () => {
      expect(CoverCentered).toBeTruthy();
    });

    it("renders default", () => {
      const { container } = render(
        <CoverCentered>
          <Lorem />
        </CoverCentered>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with custom element", () => {
      const { container } = render(
        <CoverCentered as="section">
          <Lorem />
        </CoverCentered>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders within Cover", () => {
      const { container } = render(
        <Cover gap="size3">
          <Lorem />
          <CoverCentered>
            <Lorem />
          </CoverCentered>
          <Lorem />
        </Cover>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
