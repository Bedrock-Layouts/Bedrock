import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
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
        const reel = create(
          <Reel gap="size3" snapType={snapType}>
            <Lorem />
          </Reel>,
        );
        expect(reel.toJSON()).toMatchSnapshot();
      });
    });

    it("renders default gap when none supplied", () => {
      const reel = create(
        <Reel>
          <Lorem />
        </Reel>,
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const reel = create(
          <Reel gap={gap}>
            <Lorem />
          </Reel>,
        );
        expect(reel.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gap as number", () => {
      const reel = create(
        <Reel gap={20}>
          <Lorem />
        </Reel>,
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders custom gap as string", () => {
      const reel = create(
        <Reel gap="3ch">
          <Lorem />
        </Reel>,
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders with console error with incorrect snapType", () => {
      const errorStack = create(
        // @ts-expect-error
        <Reel gap="size3" snapType="incorrect">
          <Lorem />
        </Reel>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with console error with incorrect gap", () => {
      const errorStack = create(
        // @ts-expect-error
        <Reel gap={{ value: "incorrect" }}>
          <Lorem />
        </Reel>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
