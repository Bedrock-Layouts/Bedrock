import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { InlineCluster } from "../src";

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

describe("InlineCluster", () => {
  describe("correct usage", () => {
    test("InlineCluster is not null", () => {
      expect(InlineCluster).toBeTruthy();
    });

    it("renders default gap when none provided", () => {
      const { container } = render(
        <InlineCluster>
          <Lorem />
        </InlineCluster>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <InlineCluster gap={gap}>
            <Lorem />
          </InlineCluster>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders custom gap as number", () => {
      const { container } = render(
        <InlineCluster gap={20}>
          <Lorem />
        </InlineCluster>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom gap as string", () => {
      const { container } = render(
        <InlineCluster gap="3ch">
          <Lorem />
        </InlineCluster>,
      );
      expect(container).toMatchSnapshot();
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
          <InlineCluster gap="size3" justify={justify}>
            <Lorem />
          </InlineCluster>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders all the align options", () => {
      const justifications = ["start", "center", "end", "stretch"] as const;
      justifications.forEach((align) => {
        const { container } = render(
          <InlineCluster gap="size3" align={align}>
            <Lorem />
          </InlineCluster>,
        );
        expect(container).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <InlineCluster gap="1x">
            <Lorem />
          </InlineCluster>
        </>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with theme overrides using numbers", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <InlineCluster gap="sizeNone">
            <Lorem />
          </InlineCluster>
        </>,
      );
      expect(container).toMatchSnapshot();
    });

    it("accepts className prop", () => {
      const { container } = render(
        <InlineCluster gap="size3" className="CLASSNAME">
          <Lorem />
        </InlineCluster>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <InlineCluster gap={{ value: "incorrect" }}>
          <Lorem />
        </InlineCluster>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders default with console error with incorrect justify", () => {
      const { container } = render(
        // @ts-expect-error
        <InlineCluster gap="size3" justify="incorrect">
          <Lorem />
        </InlineCluster>,
      );

      expect(container).toMatchSnapshot();
    });
    it("renders default with console error with incorrect align", () => {
      const { container } = render(
        // @ts-expect-error
        <InlineCluster gap="size3" align="incorrect">
          <Lorem />
        </InlineCluster>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
