import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { ColumnDrop } from "../src";

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

describe("ColumnDrop", () => {
  describe("correct usage", () => {
    test("ColumnDrop is not null", () => {
      expect(ColumnDrop).toBeTruthy();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <ColumnDrop gap={gap}>
            <Lorem />
          </ColumnDrop>,
        );
        const element = container.querySelector("[data-br-column-drop]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders default gap of 0px when no gap supplied", () => {
      const { container } = render(
        <ColumnDrop>
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders custom gap with number", () => {
      const { container } = render(
        <ColumnDrop gap={320}>
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("320px");
    });

    it("renders custom gap with string", () => {
      const { container } = render(
        <ColumnDrop gap="60ch">
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("60ch");
    });

    it("renders custom minItemWidth", () => {
      const { container } = render(
        <ColumnDrop gap="size3" minItemWidth={320}>
          <Lorem />
        </ColumnDrop>,
      );
      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("320px");
    });

    it("renders custom minItemWidth as string", () => {
      const { container } = render(
        <ColumnDrop gap="size3" minItemWidth="32rem">
          <Lorem />
        </ColumnDrop>,
      );
      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("32rem");
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <ColumnDrop gap={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders default with invalid minItemWidth input", () => {
      const { container } = render(
        // @ts-expect-error
        <ColumnDrop gap="size3" minItemWidth={{ value: "incorrect" }}>
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });

    it("renders default with invalid CSS length string", () => {
      const { container } = render(
        // @ts-expect-error
        <ColumnDrop gap="size3" minItemWidth="garbage">
          <Lorem />
        </ColumnDrop>,
      );

      const element = container.querySelector("[data-br-column-drop]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--min-item-width")).toBe("");
    });
  });
});
