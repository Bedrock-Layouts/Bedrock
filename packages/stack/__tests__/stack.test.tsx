import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Stack } from "../src";

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

describe("Stack", () => {
  describe("correct usage", () => {
    test("Stack is not null", () => {
      expect(Stack).toBeTruthy();
    });

    it("renders 0px default with no gap provided", () => {
      const { container } = render(
        <Stack>
          <Lorem />
        </Stack>,
      );
      const element = container.querySelector("[data-br-stack]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Stack gap={gap}>
            <Lorem />
          </Stack>,
        );
        const element = container.querySelector("[data-br-stack]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders all the align options", () => {
      (["start", "stretch", "end", "center"] as const).forEach((align) => {
        const { container } = render(
          <Stack align={align}>
            <Lorem />
          </Stack>,
        );
        const element = container.querySelector("[data-br-stack]");
        expect(element).toBeInTheDocument();
        expect(element?.getAttribute("data-br-stack")).toContain(
          `align:${align}`,
        );
      });
    });

    it("renders custom gap with number", () => {
      const { container } = render(
        <Stack gap={20}>
          <Lorem />
        </Stack>,
      );
      const element = container.querySelector("[data-br-stack]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ "--gap": "20px" });
    });

    it("renders custom gap with string", () => {
      const { container } = render(
        <Stack gap="3ch">
          <Lorem />
        </Stack>,
      );
      const element = container.querySelector("[data-br-stack]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ "--gap": "3ch" });
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap value", () => {
      const { container } = render(
        //@ts-expect-error
        <Stack gap={{ value: "incorrect" }}>
          <Lorem />
        </Stack>,
      );

      const element = container.querySelector("[data-br-stack]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });
  });
});
