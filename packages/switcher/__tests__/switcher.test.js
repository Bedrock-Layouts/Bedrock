import { breakPoints, spacing } from "@bedrock-layout/spacing-constants";
import useContainerQuery from "@bedrock-layout/use-container-query";
import React from "react";
import { act, create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { ColumnsSwitcher, SplitSwitcher } from "../src";

jest.mock("@bedrock-layout/use-container-query");

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

describe("Switcher", () => {
  test("SplitSwitcher is not null", () => {
    expect(SplitSwitcher).toBeTruthy();
  });
  test("ColumnsSwitcher is not null", () => {
    expect(ColumnsSwitcher).toBeTruthy();
  });
  // describe("SplitSwitcher", () => {
  //   describe("correct usage", () => {
  //     test("SplitSwitcher is not null", () => {
  //       expect(SplitSwitcher).toBeTruthy();
  //     });

  //     it("renders default gutters", () => {
  //       const stack = create(
  //         <SplitSwitcher gutter="lg">
  //           <Lorem />
  //         </SplitSwitcher>
  //       );
  //       expect(stack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders all the gutter options", () => {
  //       Object.keys(spacing).forEach((gutter) => {
  //         const stack = create(
  //           <SplitSwitcher gutter={gutter}>
  //             <Lorem />
  //           </SplitSwitcher>
  //         );
  //         expect(stack.toJSON()).toMatchSnapshot();
  //       });
  //     });

  //     it("renders with theme overrides", () => {
  //       const stack = create(
  //         <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
  //           <SplitSwitcher gutter="1x">
  //             <Lorem />
  //           </SplitSwitcher>
  //         </ThemeProvider>
  //       );

  //       expect(stack.toJSON()).toMatchSnapshot();
  //     });

  //     it("forwards the ref", () => {
  //       const spy = jest.fn();
  //       act(() => {
  //         create(
  //           <SplitSwitcher gutter="lg" ref={spy}>
  //             <Lorem />
  //           </SplitSwitcher>
  //         );
  //       });
  //       expect(spy).toBeCalled();
  //     });

  //     it("should render a stack if container is below default", () => {
  //       useContainerQuery.mockImplementation((...[, width]) => {
  //         return width <= breakPoints.smallOnly;
  //       });

  //       const stack = create(
  //         <SplitSwitcher gutter="lg">
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(stack.toJSON()).toMatchSnapshot();

  //       useContainerQuery.mockRestore();
  //     });

  //     it("should render a split if container is above switchAt", () => {
  //       useContainerQuery.mockImplementation((...[, width]) => {
  //         return width <= breakPoints.smallOnly;
  //       });

  //       const stack = create(
  //         <SplitSwitcher gutter="lg" switchAt={breakPoints.smallOnly + 1}>
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(stack.toJSON()).toMatchSnapshot();

  //       useContainerQuery.mockRestore();
  //     });
  //   });

  //   describe("incorrect usage", () => {
  //     beforeEach(() => {
  //       jest.spyOn(console, "error");
  //       console.error.mockImplementation(() => undefined);
  //     });
  //     afterEach(() => {
  //       console.error.mockRestore();
  //     });

  //     it("renders default with console error with no input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);

  //       const errorStack = create(
  //         <SplitSwitcher>
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with wrong input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);

  //       const errorStack = create(
  //         <SplitSwitcher gutter="incorrect">
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with console error with wrong fraction input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);

  //       const errorStack = create(
  //         <SplitSwitcher gutter="lg" fraction="incorrect">
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with console error with wrong switchAt input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);

  //       const errorStack = create(
  //         <SplitSwitcher gutter="lg" switchAt={{ value: "incorrect" }}>
  //           <Lorem />
  //         </SplitSwitcher>
  //       );

  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });
  //   });
  // });

  // describe("ColumnsSwitcher", () => {
  //   describe("correct usage", () => {
  //     test("ColumnsSwitcher is not null", () => {
  //       expect(ColumnsSwitcher).toBeTruthy();
  //     });

  //     it("renders all the gutter options", () => {
  //       Object.keys(spacing).forEach((gutter) => {
  //         const stack = create(
  //           <ColumnsSwitcher gutter={gutter}>
  //             <Lorem />
  //           </ColumnsSwitcher>
  //         );
  //         expect(stack.toJSON()).toMatchSnapshot();
  //       });
  //     });

  //     it("renders custom columns", () => {
  //       const columns = create(
  //         <ColumnsSwitcher gutter="lg" columns={5}>
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(columns.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders dense mode", () => {
  //       const columns = create(
  //         <ColumnsSwitcher gutter="lg" dense>
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(columns.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders with theme overrides", () => {
  //       const stack = create(
  //         <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
  //           <ColumnsSwitcher gutter="1x">
  //             <Lorem />
  //           </ColumnsSwitcher>
  //         </ThemeProvider>
  //       );
  //       expect(stack.toJSON()).toMatchSnapshot();
  //     });

  //     it("forwards the ref", () => {
  //       const spy = jest.fn();
  //       act(() => {
  //         create(
  //           <ColumnsSwitcher gutter="lg" ref={spy}>
  //             <Lorem />
  //           </ColumnsSwitcher>
  //         );
  //       });
  //       expect(spy).toBeCalled();
  //     });

  //     it.each`
  //       switchAt  | expected
  //       ${"1px"}  | ${1}
  //       ${"px"}   | ${1}
  //       ${"in"}   | ${1}
  //       ${"cm"}   | ${1 / 2.54}
  //       ${"mm"}   | ${1 / 25.4}
  //       ${"pt"}   | ${1 / 72}
  //       ${"pc"}   | ${1 / 6}
  //       ${"vmin"} | ${null}
  //       ${"vmax"} | ${null}
  //       ${"vh"}   | ${null}
  //       ${"vw"}   | ${null}
  //       ${"%"}    | ${null}
  //       ${"em"}   | ${NaN}
  //       ${"rem"}  | ${NaN}
  //     `(
  //       "should return defaults when not in the browser",
  //       ({ switchAt, expected }) => {
  //         let value;
  //         const setStateSpy = jest.fn((val) => (value = val));
  //         jest.spyOn(React, "useState").mockImplementation((val) => {
  //           value = val;

  //           return [value, setStateSpy];
  //         });

  //         act(() => {
  //           create(
  //             <ColumnsSwitcher gutter="lg" switchAt={switchAt}>
  //               <Lorem />
  //             </ColumnsSwitcher>
  //           );
  //         });

  //         expect(setStateSpy).toHaveBeenCalled();
  //         expect(value).toBe(expected);

  //         React.useState.mockRestore();
  //       }
  //     );

  //     it("should render a stack if container is below default", () => {
  //       useContainerQuery.mockImplementation((...[, width]) => {
  //         return width <= breakPoints.smallOnly;
  //       });

  //       const stack = create(
  //         <ColumnsSwitcher gutter="lg">
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );

  //       expect(stack.toJSON()).toMatchSnapshot();

  //       useContainerQuery.mockRestore();
  //     });

  //     it("should render a columns if container is above switchAt", () => {
  //       useContainerQuery.mockImplementation((...[, width]) => {
  //         return width <= breakPoints.smallOnly;
  //       });

  //       const stack = create(
  //         <ColumnsSwitcher gutter="lg" switchAt={breakPoints.smallOnly + 1}>
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );

  //       expect(stack.toJSON()).toMatchSnapshot();

  //       useContainerQuery.mockRestore();
  //     });
  //   });

  //   describe("incorrect usage", () => {
  //     beforeEach(() => {
  //       jest.spyOn(console, "error");
  //       console.error.mockImplementation(() => undefined);
  //     });
  //     afterEach(() => {
  //       console.error.mockRestore();
  //     });

  //     it("renders default with console error with no input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);
  //       const errorStack = create(
  //         <ColumnsSwitcher>
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with wrong input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);
  //       const errorStack = create(
  //         <ColumnsSwitcher gutter="incorrect">
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );

  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with console error with wrong columns input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);
  //       const errorStack = create(
  //         <ColumnsSwitcher columns="incorrect">
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with console error with wrong dense input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);
  //       const errorStack = create(
  //         <ColumnsSwitcher dense="incorrect">
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });

  //     it("renders default with console error with wrong switchAt input", () => {
  //       expect(console.error.mock.calls.length).toBe(0);
  //       const errorStack = create(
  //         <ColumnsSwitcher switchAt={{ value: "incorrect" }}>
  //           <Lorem />
  //         </ColumnsSwitcher>
  //       );
  //       expect(console.error).toBeCalled();
  //       expect(errorStack.toJSON()).toMatchSnapshot();
  //     });
  //   });
  // });
});
