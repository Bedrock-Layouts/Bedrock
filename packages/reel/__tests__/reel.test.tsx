import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Reel } from "../src";

const Lorem = () => (
  <>
    {Array.from(Array(3).keys()).map((i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae non
        praesentium delectus, accusamus beatae cumque nam pariatur, eius eaque
        magni expedita, perferendis ducimus. Deleniti, tenetur modi! Odit,
        consequatur dicta quas impedit incidunt rerum eaque nesciunt reiciendis
        nostrum natus libero. Doloribus fuga aut voluptatum accusantium
        similique, tempora at odio rerum repellat?
      </p>
    ))}
  </>
);

describe("Reel", () => {
  describe("correct usage", () => {
    test("Reel is not null", () => {
      expect(Reel).toBeTruthy();
    });

    it("renders snapTypes", () => {
      const snapTypeOptions = ["none", "mandatory", "proximity"] as const;
      snapTypeOptions.forEach((snapType) => {
        const { container } = render(
          <Reel gap="size3" snapType={snapType}>
            <Lorem />
          </Reel>,
        );
        const element = container.querySelector("[data-br-reel]");
        expect(element).toBeInTheDocument();
        expect(element?.getAttribute("data-br-reel")).toContain(
          `snapType:${snapType}`,
        );
      });
    });

    it("renders default gap when none supplied", () => {
      const { container } = render(
        <Reel>
          <Lorem />
        </Reel>,
      );
      const element = container.querySelector("[data-br-reel]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Reel gap={gap}>
            <Lorem />
          </Reel>,
        );
        const element = container.querySelector("[data-br-reel]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders custom gap as number", () => {
      const { container } = render(
        <Reel gap={20}>
          <Lorem />
        </Reel>,
      );
      const element = container.querySelector("[data-br-reel]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("20px");
    });

    it("renders custom gap as string", () => {
      const { container } = render(
        <Reel gap="3ch">
          <Lorem />
        </Reel>,
      );
      const element = container.querySelector("[data-br-reel]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("3ch");
    });
  });

  describe("incorrect usage", () => {
    it("renders with invalid snapType", () => {
      const { container } = render(
        // @ts-expect-error
        <Reel gap="size3" snapType="incorrect">
          <Lorem />
        </Reel>,
      );

      const element = container.querySelector("[data-br-reel]");
      expect(element).toBeInTheDocument();
      expect(element?.getAttribute("data-br-reel")).toContain(
        "snapType:incorrect",
      );
    });

    it("renders with invalid gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <Reel gap={{ value: "incorrect" }}>
          <Lorem />
        </Reel>,
      );

      const element = container.querySelector("[data-br-reel]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });
  });
});
