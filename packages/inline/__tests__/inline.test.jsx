import React from "react";
import { create } from "react-test-renderer";
import { vi } from "vitest";

import { Inline } from "../src";

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

describe("Inline", () => {
  describe("correct usage", () => {
    test("Inline is not null", () => {
      expect(Inline).toBeTruthy();
    });

    it("renders all the stretch options", () => {
      ["all", "start", "end", 0, 3].forEach((stretch) => {
        const inline = create(
          <Inline gutter="lg" stretch={stretch}>
            <Lorem />
          </Inline>
        );
        expect(inline.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with switchAt", () => {
      [42, "42rem"].forEach((switchAt) => {
        const inline = create(
          <Inline gutter="lg" switchAt={switchAt}>
            <Lorem />
          </Inline>
        );
        expect(inline.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      vi.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });
    it("renders default with console error with wrong stretch input", () => {
      expect(console.error).not.toBeCalled();
      const errorStack = create(
        <Inline gutter="lg" stretch="incorrect">
          <Lorem />
        </Inline>
      );
      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
