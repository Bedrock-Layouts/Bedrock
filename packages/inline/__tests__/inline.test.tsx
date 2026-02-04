import { sizes, spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Inline } from "../src";

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

describe("Inline", () => {
  describe("correct usage", () => {
    test("Inline is not null", () => {
      expect(Inline).toBeTruthy();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Inline gap={gap}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders all the justify options", () => {
      const justifications = [
        "start",
        "center",
        "end",
        "space-around",
        "space-between",
      ] as const;
      justifications.forEach((justify) => {
        const { container } = render(
          <Inline gap="size3" justify={justify}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        expect(element?.getAttribute("data-br-inline")).toContain(
          `justify:${justify}`,
        );
      });
    });

    it("renders all the align options", () => {
      const alignments = ["start", "center", "end", "stretch"] as const;
      alignments.forEach((align) => {
        const { container } = render(
          <Inline gap="size3" align={align}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        expect(element?.getAttribute("data-br-inline")).toContain(
          `align:${align}`,
        );
      });
    });

    it("renders all the stretch options", () => {
      const stretchOptions = ["all", "start", "end", 0, 3] as const;
      stretchOptions.forEach((stretch) => {
        const { container } = render(
          <Inline gap="size3" stretch={stretch}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        expect(element?.getAttribute("data-br-inline")).toContain(
          `stretch:${stretch}`,
        );
      });
    });

    it("renders with switchAt", () => {
      const switchAtOptions = [42, "42rem", "sizeContent2"] as const;
      switchAtOptions.forEach((switchAt) => {
        const { container } = render(
          <Inline gap="size3" switchAt={switchAt}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        if (switchAt === "sizeContent2") {
          expect(element?.style.getPropertyValue("--switch-at")).toBe(
            sizes.sizeContent2,
          );
        } else if (typeof switchAt === "number") {
          expect(element?.style.getPropertyValue("--switch-at")).toBe("42px");
        } else {
          expect(element?.style.getPropertyValue("--switch-at")).toBe("42rem");
        }
      });
    });

    it("renders with minItemWidth", () => {
      const minItemWidthOptions = [42, "42rem"] as const;
      minItemWidthOptions.forEach((minItemWidth) => {
        const { container } = render(
          <Inline gap="size3" minItemWidth={minItemWidth}>
            <Lorem />
          </Inline>,
        );
        const element = container.querySelector("[data-br-inline]");
        expect(element).toBeInTheDocument();
        if (typeof minItemWidth === "number") {
          expect(element?.style.getPropertyValue("--min-item-width")).toBe(
            "42px",
          );
        } else {
          expect(element?.style.getPropertyValue("--min-item-width")).toBe(
            "42rem",
          );
        }
      });
    });

    it("renders with spacing constant key for switchAt", () => {
      const { container } = render(
        <Inline gap="size3" switchAt="sizeXl">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).not.toBe("");
    });

    it("renders with spacing constant key for minItemWidth", () => {
      const { container } = render(
        <Inline gap="size3" minItemWidth="sizeMd">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).not.toBe("");
    });
  });

  describe("incorrect usage", () => {
    it("renders default with invalid stretch input", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" stretch="incorrect">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.getAttribute("data-br-inline")).not.toContain(
        "stretch:incorrect",
      );
    });

    it("renders default with invalid minItemWidth input", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" minItemWidth="incorrect">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });

    it("renders default with invalid CSS length switchAt string", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" switchAt="320pixels">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("");
    });

    it("renders default with invalid CSS length minItemWidth string", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" minItemWidth="320pixels">
          <Lorem />
        </Inline>,
      );

      const element = container.querySelector("[data-br-inline]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });
  });
});
