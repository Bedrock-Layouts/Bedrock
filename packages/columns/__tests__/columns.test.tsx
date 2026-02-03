import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";

import { Column, Columns } from "../src";

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

describe("Column", () => {
  describe("correct usage", () => {
    test("Column is not null", () => {
      expect(Column).toBeTruthy();
    });

    it("renders default gap", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders as main", () => {
      const { container } = render(
        <Columns gap="size3" as="main">
          <Column>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom span", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders offsetStart span", () => {
      const { container } = render(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetStart={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders offsetEnd span", () => {
      const { container } = render(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetEnd={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with console error with wrong span input", () => {
      const { container } = render(
        <Columns gap="size3">
          {/* @ts-expect-error */}
          <Column span="incorrect">
            <Lorem />
          </Column>
        </Columns>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders a span of 1 if given 0", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={0}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders a span of 1 if given negative number", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={-1}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders a span of 1 if given null", () => {
      const { container } = render(
        <Columns gap="size3">
          {/* @ts-expect-error */}
          <Column span={null}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
  });
});

describe("Columns", () => {
  describe("correct usage", () => {
    test("Columns is not null", () => {
      expect(Columns).toBeTruthy();
    });
    it("renders default gap when none provided", () => {
      const { container } = render(
        <Columns>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Columns gap={gap}>
            <Lorem />
          </Columns>,
        );
        expect(container).toMatchSnapshot();
      });
    });
    it("renders custom gap with number", () => {
      const { container } = render(
        <Columns gap={20}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders custom gap with string", () => {
      const { container } = render(
        <Columns gap="3ch">
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders custom colCount", () => {
      const { container } = render(
        <Columns gap="size3" colCount={5}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders switchAt as number", () => {
      const { container } = render(
        <Columns gap="size3" switchAt={500}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders switchAt as string", () => {
      const { container } = render(
        <Columns gap="size3" switchAt="500px">
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });

    it("renders with invalid gap (no theme provider)", () => {
      const { container } = render(
        <>
          {/* @ts-expect-error */}
          <Columns gap="1x">
            <Lorem />
          </Columns>
        </>,
      );
      expect(container).toMatchSnapshot();
    });
  });
  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns gap={{ value: "incorrect" }}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders 1 columns if given 0", () => {
      const { container } = render(
        <Columns colCount={0}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders 1 columns if given negative number", () => {
      const { container } = render(
        <Columns colCount={-1}>
          <Lorem />
        </Columns>,
      );
      expect(container).toMatchSnapshot();
    });
    it("renders default with console error with incorrect column type", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns colCount="incorrect">
          <Lorem />
        </Columns>,
      );

      expect(container).toMatchSnapshot();
    });

    it("renders default with console error with wrong switchAt input", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns gap="size3" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Columns>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
