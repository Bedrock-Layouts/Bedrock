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
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe(spacing.size3);
    });

    it("renders custom height", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="500px">
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-height")).toBe("500px");
    });
    it("renders with top", () => {
      const { container } = render(
        <Cover gap="size3" top={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("top");
    });

    it("renders with bottom", () => {
      const { container } = render(
        <Cover gap="size3" bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("bottom");
    });

    it("renders with top and bottom", () => {
      const { container } = render(
        <Cover gap="size3" top={<Lorem />} bottom={<Lorem />}>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("top");
      expect(element).toHaveAttribute("bottom");
    });

    it("renders default gap when none provided", () => {
      const { container } = render(
        <Cover>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Cover gap={gap}>
            <Lorem />
          </Cover>,
        );
        const element = container.querySelector("[data-br-cover]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders with custom gap as number", () => {
      const { container } = render(
        <Cover gap={20}>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("20px");
    });

    it("renders with custom gap as string", () => {
      const { container } = render(
        <Cover gap="3ch">
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("3ch");
    });

    it("renders with custom minHeight as string", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="50vh">
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-height")).toBe("50vh");
    });

    it("renders with custom minHeight as custom property", () => {
      const { container } = render(
        <Cover gap="size3" minHeight="var(--size-xl)">
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-height")).toBe(
        "var(--size-xl)",
      );
    });

    it("renders with custom minHeight as number", () => {
      const { container } = render(
        <Cover gap="size3" minHeight={300}>
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-height")).toBe("300px");
    });

    it("renders with minHeight as a size property", () => {
      const sizeKeys = Object.keys(sizes) as Array<keyof typeof sizes>;
      sizeKeys.forEach((size) => {
        const { container } = render(
          <Cover gap="size3" minHeight={size}>
            <p>{size}</p>
          </Cover>,
        );
        const element = container.querySelector("[data-br-cover]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--min-height")).toBe(
          sizes[size],
        );
      });
    });

    it("renders with stretched content", () => {
      const { container } = render(
        <Cover gap="size3" variant="stretch-content">
          <Lorem />
        </Cover>,
      );
      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.getAttribute("data-br-cover")).toContain(
        "stretch-content",
      );
    });
  });

  describe("incorrect usage", () => {
    it("renders default with invalid gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap={{ value: "incorrect" }}>
          <Lorem />
        </Cover>,
      );

      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders default with invalid minHeight input", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap="size3" minHeight="incorrect">
          <Lorem />
        </Cover>,
      );

      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-height")).toBe("");
    });

    it("renders without stretch-content variant with invalid stretchContent prop", () => {
      const { container } = render(
        // @ts-expect-error
        <Cover gap="size3" stretchContent="incorrect">
          <Lorem />
        </Cover>,
      );

      const element = container.querySelector("[data-br-cover]");
      expect(element).toBeInTheDocument();
      expect(element?.getAttribute("data-br-cover") ?? "").not.toContain(
        "stretch-content",
      );
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
      const element = container.querySelector("[data-br-cover-centered]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-br-cover-centered");
    });

    it("renders with custom element", () => {
      const { container } = render(
        <CoverCentered as="section">
          <Lorem />
        </CoverCentered>,
      );
      const element = container.querySelector("[data-br-cover-centered]");
      expect(element).toBeInTheDocument();
      expect(element?.tagName).toBe("SECTION");
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
      const element = container.querySelector("[data-br-cover]");
      const centered = container.querySelector("[data-br-cover-centered]");
      expect(element).toBeInTheDocument();
      expect(centered).toBeInTheDocument();
    });
  });
});
