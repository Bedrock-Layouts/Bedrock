import React from "react";
import { create } from "react-test-renderer";
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
      const center = create(
        <Center>
          <Lorem />
        </Center>,
      );
      expect(center.toJSON()).toMatchSnapshot();
    });

    it("renders custom width", () => {
      const center = create(
        <Center maxWidth={320}>
          <Lorem />
        </Center>,
      );
      expect(center.toJSON()).toMatchSnapshot();
    });

    it("renders custom width as string", () => {
      const center = create(
        <Center maxWidth="320px">
          <Lorem />
        </Center>,
      );
      expect(center.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    it("renders default width if invalid CSS length", () => {
      const center = create(
        // @ts-expect-error
        <Center maxWidth="320pixels">
          <Lorem />
        </Center>,
      );
      expect(center.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with no children", () => {
      const errorStack = create(
        // @ts-expect-error
        <Center maxWidth={["incorrect"]}>
          <Lorem />
        </Center>,
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
