import React from "react";
import { create } from "react-test-renderer";

import { Reel } from "../src";

const Lorem = () => (
  <>
    {Array.from(Array(20).keys()).map((i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae non
        praesentium delectus, accusamus beatae cumque nam pariatur, eius eaque
        magni expedita, perferendis ducimus. Deleniti, tenetur modi! Odit,
        consequatur dicta quas impedit incidunt rerum eaque nesciunt reiciendis
        nostrum natus libero. Doloribus fuga aut voluptatum accusantium
        similique, tempora at odio rerum repellat?
      </p>
    ))}
  </>
);

describe("Reel", () => {
  describe("correct usage", () => {
    test("Reel is not null", () => {
      expect(Reel).toBeTruthy();
    });

    it("renders custom width", () => {
      const reel = create(
        <Reel maxWidth={200}>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders custom height", () => {
      const reel = create(
        <Reel maxHeight={200}>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders horizontal scroll", () => {
      const reel = create(
        <Reel snapX>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders horizontal proximity snap", () => {
      const reel = create(
        <Reel proximity>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });

    it("renders with maxWidth and maxHeight", () => {
      const reel = create(
        <Reel maxWidth={250} maxHeight={250}>
          <Lorem />
        </Reel>
      );
      expect(reel.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      jest.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("renders default with console error", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Reel maxWidth="incorrect">
          <Lorem />
        </Reel>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
