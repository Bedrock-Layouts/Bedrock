import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { Frame } from "../src";

describe("Frame", () => {
  describe("correct usage", () => {
    test("Frame is not null", () => {
      expect(Frame).toBeTruthy();
    });

    it("renders with ratio as an array", () => {
      const { container } = render(
        <Frame ratio={[16, 9]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("16/9");
    });

    it("renders with ratio as a string", () => {
      const { container } = render(
        <Frame ratio="16/9">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("16/9");
    });

    it("renders with ratio as a string with spaces", () => {
      const { container } = render(
        <Frame ratio="16 / 9">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("16/9");
    });

    it("renders with ratio string using a colon", () => {
      const { container } = render(
        <Frame ratio="16:9">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("16/9");
    });

    it("renders with ratio string using a colon and with spaces", () => {
      const { container } = render(
        <Frame ratio="16 : 9">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("16/9");
    });

    it("renders without ratio", () => {
      const { container } = render(
        <Frame>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });

    it("renders custom position", () => {
      const { container } = render(
        <Frame ratio={[16, 9]} position="top left">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );
      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--position")).toBe("top left");
    });
  });

  describe("incorrect usage", () => {
    it("renders default position with incorrect value", () => {
      const { container } = render(
        // @ts-expect-error
        <Frame ratio={[16, 9]} position={true}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--position")).toBe("");
    });

    it("renders without ratio if ratio is not correct type", () => {
      const { container } = render(
        // @ts-expect-error
        <Frame ratio={{ 0: 16, 1: 9 }}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });

    it("renders without ratio with error if array of length <1 provided", () => {
      const { container } = render(
        // @ts-expect-error
        <Frame ratio={[16]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });

    it("renders without ratio with error if array of length >2 provided", () => {
      const { container } = render(
        // @ts-expect-error
        <Frame ratio={[16, 9, 8, 6]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });

    it("renders without ratio with error if array of not numbers provided", () => {
      const { container } = render(
        // @ts-expect-error
        <Frame ratio={["16", "9"]}>
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });

    it("renders without ratio with error if ratio string is not correct format", () => {
      const { container } = render(
        <Frame ratio="16x9">
          <img src="https://picsum.photos/5000" alt="random thing" />
        </Frame>,
      );

      const element = container.querySelector("[data-br-frame]");
      expect(element).toBeInTheDocument();
      expect(element?.style.getPropertyValue("--ratio")).toBe("");
    });
  });
});
