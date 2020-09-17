import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import Cover from "../src";

const Lorem = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
    vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus neque
    sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum sollicitudin
    elit ac nunc scelerisque rhoncus. Nulla felis sapien, condimentum ut
    imperdiet vel, aliquet id ante. Pellentesque habitant morbi tristique
    senectus et netus et malesuada fames ac turpis egestas. Quisque ultrices,
    quam nec scelerisque malesuada, lectus elit semper diam, ac placerat purus
    tortor et enim.
  </p>
);

describe("Cover", () => {
  describe("correct usage", () => {
    test("Cover is not null", () => {
      expect(Cover).toBeTruthy();
    });

    it("renders default", () => {
      const cover = create(
        <Cover>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders custom height", () => {
      const cover = create(
        <Cover minHeight="500px">
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });
    it("renders with top", () => {
      const cover = create(
        <Cover top={<Lorem />}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders with bottom", () => {
      const cover = create(
        <Cover bottom={<Lorem />}>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const cover = create(
          <Cover gutter={gutter}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the padding options", () => {
      Object.keys(spacing).forEach((padding) => {
        const cover = create(
          <Cover padding={padding}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("use 1, 2, 3, 4 items arrays", () => {
      [
        ["md"],
        ["md", "lg"],
        ["md", "lg", "xs"],
        ["md", "lg", "xs", "sm"],
      ].forEach((padding) => {
        const cover = create(
          <Cover padding={padding}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("use padding object", () => {
      [
        { left: "md" },
        { right: "md" },
        { top: "md" },
        { bottom: "md" },
        { inlineStart: "md" },
        { inlineEnd: "md" },
        { blockStart: "md" },
        { blockEnd: "md" },
      ].forEach((padding) => {
        const cover = create(
          <Cover padding={padding}>
            <Lorem />
          </Cover>
        );
        expect(cover.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const cover = create(
        <ThemeProvider theme={{ spacing: { md: 1600 } }}>
          <Cover>
            <Lorem />
          </Cover>
        </ThemeProvider>
      );
      expect(cover.toJSON()).toMatchSnapshot();
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

    it("renders default with console error with wrong gutter", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <Cover gutter="incorrect">
          <Lorem />
        </Cover>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders with min-height incorrect with invalid minHeight", () => {
      const errorStack = create(
        <Cover minHeight="incorrect">
          <Lorem />
        </Cover>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders throws with more than one child", () => {
      expect(console.error).not.toBeCalled();
      class CatchError extends React.Component {
        state = { isError: false };
        componentDidCatch() {
          this.setState({ isError: true });
        }
        render() {
          return this.state.isError ? null : this.props.children;
        }
      }

      create(
        <CatchError>
          <Cover>
            <Lorem />
            <Lorem />
          </Cover>
        </CatchError>
      );

      expect(console.error).toBeCalled();
    });
  });
});
