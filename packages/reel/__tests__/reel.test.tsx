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
      ["none", "mandatory", "proximity"].forEach((snapType) => {
        const reel = create(
          <Reel gutter="size3" snapType={snapType}>
            <Lorem />
          </Reel>
        );
        expect(reel.toJSON()).toMatchSnapshot();
      });
    });

    it("renders default gutter when none supplied", () => {
      const reel = create(
        <Reel>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const reel = create(
          <Reel gutter={gutter}>
            <Lorem />
          </Reel>
        );
        expect(reel.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gutter as number", () => {
      const reel = create(
        <Reel gutter={20}>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders custom gutter as string", () => {
      const reel = create(
        <Reel gutter="3ch">
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders with console error with incorrect snapType", () => {
      const errorStack = create(
        <Reel gutter="size3" snapType="incorrect">
          <Lorem />
        </Reel>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders with console error with incorrect gutter", () => {
      const errorStack = create(
        <Reel gutter={{ value: "incorrect" }}>
          <Lorem />
        </Reel>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
