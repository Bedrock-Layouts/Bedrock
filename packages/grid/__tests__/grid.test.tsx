import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Grid } from "../src";

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

describe("Grid", () => {
  describe("correct usage", () => {
    test("Grid is not null", () => {
      expect(Grid).toBeTruthy();
    });

    it("renders default with no gap", () => {
      const { container } = render(
        <Grid>
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Grid gap={gap}>
            <Lorem />
          </Grid>,
        );
        const element = container.querySelector("[data-br-grid]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders custom gap with number", () => {
      const { container } = render(
        <Grid gap={20}>
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("20px");
    });

    it("renders custom gap with string", () => {
      const { container } = render(
        <Grid gap="3ch">
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("3ch");
    });

    it("renders custom minItemWidth", () => {
      const { container } = render(
        <Grid gap="size3" minItemWidth={320}>
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("320px");
    });

    it("renders custom minItemWidth as string", () => {
      const { container } = render(
        <Grid gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("32rem");
    });

    it("renders masonry variant", () => {
      const { container } = render(
        <Grid variant="masonry" gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-br-grid", "variant:masonry");
    });

    it("renders with theme overrides", () => {
      const { container } = render(
        <>
          {/** @ts-ignore */}
          <Grid gap="1x">
            <Lorem />
          </Grid>
        </>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <Grid gap={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders default with invalid minItemWidth input", () => {
      const { container } = render(
        // @ts-expect-error
        <Grid gap="size3" minItemWidth={{ value: "incorrect" }}>
          <Lorem />
        </Grid>,
      );

      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });

    it("renders default with invalid CSS length string", () => {
      const { container } = render(
        // @ts-expect-error
        <Grid gap="size3" minItemWidth="garbage">
          <Lorem />
        </Grid>,
      );

      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });

    it("renders grid if anything used as variant other than `masonry`", () => {
      const { container } = render(
        // @ts-expect-error
        <Grid variant="incorrect" gap="size3" minItemWidth="32rem">
          <Lorem />
        </Grid>,
      );
      const element = container.querySelector("[data-br-grid]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-br-grid", "true");
    });
  });
});
