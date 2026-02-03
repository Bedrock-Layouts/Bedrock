import { spacing } from "@bedrock-layout/spacing-constants";
import { useContainerQuery } from "@bedrock-layout/use-container-query";
import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test, vi } from "vitest";

import { Split } from "../src";

vi.mock("@bedrock-layout/use-container-query");

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

describe("Split", () => {
  describe("correct usage", () => {
    test("Split is not null", () => {
      expect(Split).toBeTruthy();
    });

    it("renders default gap when none provided", () => {
      const split = create(
        <Split>
          <Lorem />
        </Split>,
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const split = create(
          <Split gap={gap}>
            <Lorem />
          </Split>,
        );
        expect(split.toJSON()).toMatchSnapshot();
      });
    });

    it("renders custom gap with number", () => {
      const split = create(
        <Split gap={1}>
          <Lorem />
        </Split>,
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders custom gap with string", () => {
      const split = create(
        <Split gap="3ch">
          <Lorem />
        </Split>,
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("renders all the fraction options", () => {
      ["auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"].forEach(
        (fraction) => {
          const split = create(
            <Split gap="size3" fraction={fraction}>
              <Lorem />
            </Split>,
          );
          expect(split.toJSON()).toMatchSnapshot();
        },
      );
    });

    it("renders with theme overrides", () => {
      const split = create(
        <>
          {/* @ts-expect-error */}
          <Split gap="1x">
            <Lorem />
          </Split>
        </>,
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it("should render a stack if container is below switchAt", () => {
      const widthToSwitchAt = 600;
      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt + 1;
      });

      const stack = create(
        <Split gap="size3" switchAt={widthToSwitchAt}>
          <Lorem />
        </Split>,
      );

      expect(stack.toJSON()).toMatchSnapshot();
      // @ts-expect-error
      useContainerQuery.mockRestore();
    });

    it("should render as a main", () => {
      const stack = create(
        <Split gap="size3" as="main">
          <Lorem />
        </Split>,
      );

      expect(stack.toJSON()).toMatchSnapshot();
    });

    it("should render a split if container is above switchAt", () => {
      const widthToSwitchAt = 600;
      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const stack = create(
        <Split gap="size3" switchAt={widthToSwitchAt + 1}>
          <Lorem />
        </Split>,
      );

      expect(stack.toJSON()).toMatchSnapshot();

      // @ts-expect-error
      useContainerQuery.mockRestore();
    });

    it("should render a split if container is above switchAt using a css string", () => {
      const widthToSwitchAt = 600;

      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const stack = create(
        <Split gap="size3" switchAt={`${(widthToSwitchAt + 1) / 16}rem`}>
          <Lorem />
        </Split>,
      );

      expect(stack.toJSON()).toMatchSnapshot();

      // @ts-expect-error
      useContainerQuery.mockRestore();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", async () => {
      const errorStack = create(
        // @ts-expect-error
        <Split gap={{ value: "incorrect" }}>
          <Lorem />
        </Split>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with negative number for gap", () => {
      const errorStack = create(
        <Split gap={-1}>
          <Lorem />
        </Split>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with fraction input", () => {
      const errorStack = create(
        <Split fraction="incorrect">
          <Lorem />
        </Split>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with wrong switchAt input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Split gap="size3" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Split>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
