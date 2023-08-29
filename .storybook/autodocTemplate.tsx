import React from "react";

import {
  Title,
  Description,
  Primary,
  Controls,
  Stories,
  useOf,
  Subheading,
  Source,
} from "@storybook/blocks";

function Examples() {
  const resolvedOf = useOf("component");
  const resolvedOfMeta = useOf("meta");

  const componentName =
    resolvedOf.type === "component"
      ? //@ts-expect-error
        resolvedOf.component.displayName
      : "Component";

  const examples = (
    resolvedOfMeta.type === "meta"
      ? resolvedOfMeta.preparedMeta.parameters.examples ?? []
      : []
  ) as { name: string; path: string }[];

  if (examples.length === 0) return null;

  return (
    <>
      <h2>Examples</h2>
      <p>
        Some examples of where you might use a <code>{componentName}</code>{" "}
        component:
      </p>
      <ul>
        {examples.map((example) => (
          <li key={example.name}>
            <a href={example.path}>{example.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

function InstallationAndImport() {
  const resolvedOfMeta = useOf("meta");
  if (resolvedOfMeta.type !== "meta") return null;

  const { install, import: importCode } =
    resolvedOfMeta.preparedMeta.parameters.installAndImport;

  if (!install && !importCode) return null;

  return (
    <>
      <h2>Installation and Import</h2>
      <p>To install use your favorite package manager CLI:</p>
      <Source language="bash" code={install} />

      <p>Then import the component in your project:</p>
      <Source language="jsx" code={importCode} />
    </>
  );
}

export function template() {
  return (
    <>
      <Title />
      <Description />
      <Examples />
      <InstallationAndImport />
      <Subheading>API</Subheading>
      <Primary />
      <Controls />
      <Stories includePrimary={false} title="" />
    </>
  );
}
