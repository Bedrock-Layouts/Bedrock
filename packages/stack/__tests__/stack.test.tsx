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
      expect(container).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Stack gap={gap}>
            <Lorem />
          </Stack>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders all the align options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      (["start", "stretch", "end", "center"] as const).forEach((align) => {
        const { container } = render(
          <Stack align={align}>
            <Lorem />
          </Stack>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders custom gap with number", () => {
      const { container } = render(
        <Stack gap={20}>
          <Lorem />
        </Stack>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom gap with string", () => {
      const { container } = render(
        <Stack gap="3ch">
          <Lorem />
        </Stack>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with theme overrides", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <Stack gap="1x">
            <Lorem />
          </Stack>
        </>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with theme overrides using 'space' as key", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <Stack gap="1x">
            <Lorem />
          </Stack>
        </>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders 0px with theme overrides", () => {
      const { container } = render(
        <>
          <Stack gap="size3">
            <Lorem />
          </Stack>
        </>,
      );
      expect(container).toMatchSnapshot();
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

      expect(container).toMatchSnapshot();
    });
  });
});
