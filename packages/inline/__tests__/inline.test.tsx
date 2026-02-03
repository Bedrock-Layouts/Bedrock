import { spacing } from "@bedrock-layout/spacing-constants";
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
        expect(container).toMatchSnapshot();
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
        expect(container).toMatchSnapshot();
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
        expect(container).toMatchSnapshot();
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
        expect(container).toMatchSnapshot();
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
        expect(container).toMatchSnapshot();
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
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("incorrect usage", () => {
    it("renders default with console error with wrong stretch input", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" stretch="incorrect">
          <Lorem />
        </Inline>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders default with console error with wrong minItemWidth input", () => {
      const { container } = render(
        // @ts-expect-error
        <Inline gap="size3" minItemWidth="incorrect">
          <Lorem />
        </Inline>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
