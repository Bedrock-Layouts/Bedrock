import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
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
      const columns = create(
        <Columns gap="size3">
          <Column>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders as main", () => {
      const columns = create(
        <Columns gap="size3" as="main">
          <Column>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders custom span", () => {
      const columns = create(
        <Columns gap="size3">
          <Column span={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders offsetStart span", () => {
      const columns = create(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetStart={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders offsetEnd span", () => {
      const columns = create(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetEnd={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with console error with wrong span input", () => {
      const errorStack = create(
        <Columns gap="size3">
          {/* @ts-expect-error */}
          <Column span="incorrect">
            <Lorem />
          </Column>
        </Columns>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given 0", () => {
      const columns = create(
        <Columns gap="size3">
          <Column span={0}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given negative number", () => {
      const columns = create(
        <Columns gap="size3">
          <Column span={-1}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders a span of 1 if given null", () => {
      const columns = create(
        <Columns gap="size3">
          {/* @ts-expect-error */}
          <Column span={null}>
            <Lorem />
          </Column>
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
  });
});

describe("Columns", () => {
  describe("correct usage", () => {
    test("Columns is not null", () => {
      expect(Columns).toBeTruthy();
    });
    it("renders default gap when none provided", () => {
      const columns = create(
        <Columns>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const columns = create(
          <Columns gap={gap}>
            <Lorem />
          </Columns>,
        );
        expect(columns.toJSON()).toMatchSnapshot();
      });
    });
    it("renders custom gap with number", () => {
      const columns = create(
        <Columns gap={20}>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
    it("renders custom gap with string", () => {
      const columns = create(
        <Columns gap="3ch">
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders custom colCount", () => {
      const columns = create(
        <Columns gap="size3" colCount={5}>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders switchAt as number", () => {
      const columns = create(
        <Columns gap="size3" switchAt={500}>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders switchAt as string", () => {
      const columns = create(
        <Columns gap="size3" switchAt="500px">
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });

    it("renders with invalid gap (no theme provider)", () => {
      const columns = create(
        <>
          {/* @ts-expect-error */}
          <Columns gap="1x">
            <Lorem />
          </Columns>
        </>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
  });
  describe("incorrect usage", () => {
    it("renders default with wrong gap input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Columns gap={{ value: "incorrect" }}>
          <Lorem />
        </Columns>,
      );
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders 1 columns if given 0", () => {
      const columns = create(
        <Columns colCount={0}>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
    it("renders 1 columns if given negative number", () => {
      const columns = create(
        <Columns colCount={-1}>
          <Lorem />
        </Columns>,
      );
      expect(columns.toJSON()).toMatchSnapshot();
    });
    it("renders default with console error with incorrect column type", () => {
      const errorStack = create(
        // @ts-expect-error
        <Columns colCount="incorrect">
          <Lorem />
        </Columns>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with wrong switchAt input", () => {
      const errorStack = create(
        // @ts-expect-error
        <Columns gap="size3" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Columns>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
