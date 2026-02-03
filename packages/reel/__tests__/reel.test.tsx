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
        expect(container).toMatchSnapshot();
      });
    });

    it("renders default gap when none supplied", () => {
      const { container } = render(
        <Reel>
          <Lorem />
        </Reel>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Reel gap={gap}>
            <Lorem />
          </Reel>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders custom gap as number", () => {
      const { container } = render(
        <Reel gap={20}>
          <Lorem />
        </Reel>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom gap as string", () => {
      const { container } = render(
        <Reel gap="3ch">
          <Lorem />
        </Reel>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders with console error with incorrect snapType", () => {
      const { container } = render(
        // @ts-expect-error
        <Reel gap="size3" snapType="incorrect">
          <Lorem />
        </Reel>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders with console error with incorrect gap", () => {
      const { container } = render(
        // @ts-expect-error
        <Reel gap={{ value: "incorrect" }}>
          <Lorem />
        </Reel>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
