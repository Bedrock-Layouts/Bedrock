import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Center } from "../src";

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

describe("Center", () => {
  describe("correct usage", () => {
    test("Center is not null", () => {
      expect(Center).toBeTruthy();
    });

    it("renders default width", () => {
      const { container } = render(
        <Center>
          <Lorem />
        </Center>,
      );
      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--max-width")).toBe("");
    });

    it("renders custom width", () => {
      const { container } = render(
        <Center maxWidth={320}>
          <Lorem />
        </Center>,
      );
      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ "--max-width": "320px" });
    });

    it("renders custom width as string", () => {
      const { container } = render(
        <Center maxWidth="320px">
          <Lorem />
        </Center>,
      );
      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ "--max-width": "320px" });
    });

    it("renders with spacing constant key for maxWidth", () => {
      const { container } = render(
        <Center maxWidth="sizeXl">
          <Lorem />
        </Center>,
      );

      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--max-width")).not.toBe("");
    });
  });

  describe("incorrect usage", () => {
    it("renders default width if invalid CSS length", () => {
      const { container } = render(
        // @ts-expect-error
        <Center maxWidth="320pixels">
          <Lorem />
        </Center>,
      );
      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--max-width")).toBe("");
    });

    it("renders default with invalid maxWidth input", () => {
      const { container } = render(
        // @ts-expect-error
        <Center maxWidth={["incorrect"]}>
          <Lorem />
        </Center>,
      );

      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--max-width")).toBe("");
    });

    it("renders with spacing constant key for maxWidth", () => {
      const { container } = render(
        // @ts-expect-error
        <Center maxWidth="sizeXl">
          <Lorem />
        </Center>,
      );

      const element = container.querySelector("[data-br-center]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--max-width")).not.toBe("");
    });
  });
});
