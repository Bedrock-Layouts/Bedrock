import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

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
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe(spacing.size3);
    });

    it("renders as main", () => {
      const { container } = render(
        <Columns gap="size3" as="main">
          <Column>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.tagName).toBe("MAIN");
    });

    it("renders custom span", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--col-span")).toBe("2");
    });

    it("renders offsetStart span", () => {
      const { container } = render(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetStart={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--offset-start")).toBe("2");
    });

    it("renders offsetEnd span", () => {
      const { container } = render(
        <Columns gap="size3" colCount={4}>
          <Column span={2} offsetEnd={2}>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--offset-end")).toBe("2");
    });
  });

  describe("incorrect usage", () => {
    it("renders default with invalid span input", () => {
      const { container } = render(
        <Columns gap="size3">
          {/* @ts-expect-error */}
          <Column span="incorrect">
            <Lorem />
          </Column>
        </Columns>,
      );

      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--col-span")).toBe("1");
    });

    it("renders a span of 1 if given 0", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={0}>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--col-span")).toBe("1");
    });

    it("renders a span of 1 if given negative number", () => {
      const { container } = render(
        <Columns gap="size3">
          <Column span={-1}>
            <Lorem />
          </Column>
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--col-span")).toBe("1");
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
      const element = container.querySelector("[data-br-columns]");
      const column = container.querySelector("[data-br-column]");
      expect(element).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column?.style.getPropertyValue("--col-span")).toBe("1");
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
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });
    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Columns gap={gap}>
            <Lorem />
          </Columns>,
        );
        const element = container.querySelector("[data-br-columns]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });
    it("renders custom gap with number", () => {
      const { container } = render(
        <Columns gap={20}>
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("20px");
    });
    it("renders custom gap with string", () => {
      const { container } = render(
        <Columns gap="3ch">
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("3ch");
    });

    it("renders custom colCount", () => {
      const { container } = render(
        <Columns gap="size3" colCount={5}>
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--col-count")).toBe("5");
    });

    it("renders switchAt as number", () => {
      const { container } = render(
        <Columns gap="size3" switchAt={500}>
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("500px");
    });

    it("renders switchAt as string", () => {
      const { container } = render(
        <Columns gap="size3" switchAt="500px">
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("500px");
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
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
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
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });
    it("renders 1 columns if given 0", () => {
      const { container } = render(
        <Columns colCount={0}>
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--col-count")).toBe("1");
    });
    it("renders 1 columns if given negative number", () => {
      const { container } = render(
        <Columns colCount={-1}>
          <Lorem />
        </Columns>,
      );
      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--col-count")).toBe("1");
    });
    it("renders default with invalid colCount type", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns colCount="incorrect">
          <Lorem />
        </Columns>,
      );

      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--col-count")).toBe("1");
    });

    it("renders default with invalid switchAt input", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns gap="size3" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Columns>,
      );

      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("");
    });

    it("renders default with invalid CSS length switchAt string", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns gap="size3" switchAt="320pixels">
          <Lorem />
        </Columns>,
      );

      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("");
    });

    it("renders with spacing constant key for switchAt", () => {
      const { container } = render(
        // @ts-expect-error
        <Columns gap="size3" switchAt="sizeXl">
          <Lorem />
        </Columns>,
      );

      const element = container.querySelector("[data-br-columns]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).not.toBe("");
    });
  });
});
