import { Stack } from "@bedrock-layout/solid";
import { JSXElement, createSignal } from "solid-js";

import { ArgsTable } from "../../components/ArgsTable";
import { Heading } from "../../components/Heading";
import { PageSection } from "../../components/PageSection";
import { Story } from "../../components/Story";
import { argTypes } from "./argTypes";
import { Basis } from "./basis";
import minItemWidth from "./basis?raw";
import { Gap } from "./gap";
import gapCode from "./gap?raw";
import { NoStretch } from "./noStretch";
import noStretchCode from "./noStretch?raw";
import { Playground } from "./playground";
import playgroundCode from "./playground?raw";

export function ColumnDropPage(): JSXElement {
  const initialValues = Object.fromEntries(
    Object.entries(argTypes).map(([key, { initialValue }]) => [
      key,
      initialValue,
    ]),
  );

  const [props, setProps] = createSignal(initialValues);

  return (
    <Stack gap="size9">
      <Heading id="title">ColumnDrop</Heading>
      <PageSection title="Use Case">
        <p>
          The <code>ColumnDrop</code> component is used to create a layout of
          columns that stretch to fit the space, and snaps to the next line at a
          minimum size. As columns drop down to a new row, they will be laid out
          independently of the column layout above. This is a common layout for
          marketing sites.
        </p>
      </PageSection>
      <PageSection title="API">
        <ArgsTable args={argTypes} />
      </PageSection>
      <PageSection title="gap">
        <p>
          The gap prop defines the gap size between elements. Bedrock has
          implemented a default spacing scheme, but it can be overridden with
          custom CSS length values.
        </p>

        <p>Here are the possible values for gap by default:</p>
        <Story code={gapCode}>
          <Gap />
        </Story>
      </PageSection>
      <PageSection title="minItemWidth">
        <p>
          The `minItemWidth` prop defines the minItemWidth of each of the
          children. The `ColumnDrop` will the optimize how many columns and rows
          are needed based on that value.
        </p>

        <p>
          In the below example, The `minItemWidth` is set to `15rem`. As you
          resize the window, the Grid will recalculate and potentially change
          the count of columns and rows.
        </p>
        <Story code={minItemWidth}>
          <Basis />
        </Story>
      </PageSection>
      <PageSection title="noStretchedColumns">
        <p>
          By default, the column-drop component will stretch the columns to fit
          the container. If you want to prevent this behavior, you can add the
          `noStretchedColumns` prop. The `ColumnDrop` will then use the `basis`
          prop to determine the width of each column and center the columns on
          each row.
        </p>

        <p>
          In the below example, The `basis` is set to `15rem`. As you resize the
          window, the ColumnDrop will recalculate and potentially change the
          count of columns and rows.
        </p>
        <Story code={noStretchCode}>
          <NoStretch />
        </Story>
      </PageSection>
      <PageSection title="Playground">
        <Story code={playgroundCode}>
          <Playground {...props()} />
        </Story>
        <ArgsTable
          args={argTypes}
          onChange={({ propName, value }) => {
            setProps({ ...props(), [propName]: value });
            return value;
          }}
        />
      </PageSection>
    </Stack>
  );
}
