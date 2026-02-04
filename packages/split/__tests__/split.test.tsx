import { spacing } from "@bedrock-layout/spacing-constants";
import { useContainerQuery } from "@bedrock-layout/use-container-query";
import React from "react";
import { render } from "@testing-library/react";
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
      const { container } = render(
        <Split>
          <Lorem />
        </Split>,
      );
      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders all the gap options", () => {
      const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
      spacingKeys.forEach((gap) => {
        const { container } = render(
          <Split gap={gap}>
            <Lorem />
          </Split>,
        );
        const element = container.querySelector("[data-br-split]");
        expect(element).toBeInTheDocument();
        expect(element?.style.getPropertyValue("--gap")).toBe(spacing[gap]);
      });
    });

    it("renders custom gap with number", () => {
      const { container } = render(
        <Split gap={1}>
          <Lorem />
        </Split>,
      );
      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("1px");
    });

    it("renders custom gap with string", () => {
      const { container } = render(
        <Split gap="3ch">
          <Lorem />
        </Split>,
      );
      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("3ch");
    });

    it("renders all the fraction options", () => {
      ["auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"].forEach(
        (fraction) => {
          const { container } = render(
            <Split gap="size3" fraction={fraction}>
              <Lorem />
            </Split>,
          );
          const element = container.querySelector("[data-br-split]");
          expect(element).toBeInTheDocument();
          expect(element?.getAttribute("data-br-split")).toContain(
            `fraction:${fraction}`,
          );
        },
      );
    });

    it("should render a stack if container is below switchAt", () => {
      const widthToSwitchAt = 600;
      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt + 1;
      });

      const { container } = render(
        <Split gap="size3" switchAt={widthToSwitchAt}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("600px");
      // @ts-expect-error
      useContainerQuery.mockRestore();
    });

    it("should render as a main", () => {
      const { container } = render(
        <Split gap="size3" as="main">
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.tagName).toBe("MAIN");
    });

    it("should render a split if container is above switchAt", () => {
      const widthToSwitchAt = 600;
      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const { container } = render(
        <Split gap="size3" switchAt={widthToSwitchAt + 1}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe("601px");

      // @ts-expect-error
      useContainerQuery.mockRestore();
    });

    it("should render a split if container is above switchAt using a css string", () => {
      const widthToSwitchAt = 600;
      const expectedSwitchAt = `${(widthToSwitchAt + 1) / 16}rem`;

      // @ts-expect-error
      useContainerQuery.mockImplementation((...[, width]) => {
        return width <= widthToSwitchAt;
      });

      const { container } = render(
        <Split gap="size3" switchAt={expectedSwitchAt}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe(
        expectedSwitchAt,
      );

      // @ts-expect-error
      useContainerQuery.mockRestore();
    });
  });

  describe("incorrect usage", () => {
    it("renders default with wrong gap input", async () => {
      const { container } = render(
        // @ts-expect-error
        <Split gap={{ value: "incorrect" }}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders default with negative number for gap", () => {
      const { container } = render(
        <Split gap={-1}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--gap")).toBe("");
    });

    it("renders default with invalid fraction", () => {
      const { container } = render(
        <Split fraction="incorrect">
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.getAttribute("data-br-split")).toBe("");
    });

    it("renders default with invalid switchAt input", () => {
      const { container } = render(
        // @ts-expect-error
        <Split gap="size3" switchAt={{ value: "incorrect" }}>
          <Lorem />
        </Split>,
      );

      const element = container.querySelector("[data-br-split]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--switch-at")).toBe(
        "[object Object]",
      );
    });
  });
});
