import React from "react";
import { create } from "react-test-renderer";
import { describe, expect, it, test } from "vitest";

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

    it("renders all the justify options", () => {
      ["start", "center", "end"].forEach((justify) => {
        const inlineCluster = create(
          <Inline gutter="size3" justify={justify}>
            <Lorem />
          </Inline>,
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the align options", () => {
      ["start", "center", "end", "stretch"].forEach((align) => {
        const inlineCluster = create(
          <Inline gutter="size3" align={align}>
            <Lorem />
          </Inline>,
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the stretch options", () => {
      ["all", "start", "end", 0, 3].forEach((stretch) => {
        const inline = create(
          <Inline gutter="size3" stretch={stretch}>
            <Lorem />
          </Inline>,
        );
        expect(inline.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with switchAt", () => {
      [42, "42rem", "sizeContent2"].forEach((switchAt) => {
        const inline = create(
          <Inline gutter="size3" switchAt={switchAt}>
            <Lorem />
          </Inline>,
        );
        expect(inline.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with minItemWidth", () => {
      [42, "42rem"].forEach((minItemWidth) => {
        const inline = create(
          <Inline gutter="size3" minItemWidth={minItemWidth}>
            <Lorem />
          </Inline>,
        );
        expect(inline.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("incorrect usage", () => {
    it("renders default with console error with wrong stretch input", () => {
      const errorStack = create(
        <Inline gutter="size3" stretch="incorrect">
          <Lorem />
        </Inline>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with wrong minItemWidth input", () => {
      const errorStack = create(
        <Inline gutter="size3" minItemWidth="incorrect">
          <Lorem />
        </Inline>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
