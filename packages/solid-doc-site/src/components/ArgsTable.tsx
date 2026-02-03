/* eslint-disable react/style-prop-object */
import { Stack } from "@bedrock-layout/solid";
import { For, JSX, JSXElement, Match, Switch } from "solid-js";
import { styled } from "solid-styled-components";
import { ArgType } from "src/types/argType";

const SelectWrapper = styled.div`
  --size: 91px;
  position: relative;
  width: 100%;
  &:after {
    content: "";
    clip-path: path(
      "M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
    );

    background: var(--gray-7);
    width: var(--size);
    height: var(--size);
    position: absolute;
    transform: scale(0.15);
    right: calc(var(--size-6) * -1);
    top: calc(var(--size-6) * -1);
  }
`;

const Select = styled.select`
  appearance: none;
  box-sizing: border-box;
  border: 1px solid var(--gray-7);
  border-radius: var(--radius-2);
  cursor: pointer;
  background-color: #fff;

  padding: var(--size-2) var(--size-1);
  width: 100%;
`;

const TextBox = styled.input`
  box-sizing: border-box;
  border: 1px solid var(--gray-7);
  border-radius: var(--radius-2);
  cursor: pointer;
  background-color: #fff;

  padding: var(--size-2) var(--size-1);
  width: 100%;
`;

const HeaderRow = styled("tr")`
  text-align: left;
`;

const Summary = styled("code")`
  background-color: var(--gray-2);
  padding: var(--size-2);
  border-radius: var(--radius-3);
`;

const BodyRow = styled("tr")`
  --border-style: 1px solid var(--gray-3);
  > td {
    border-top: var(--border-style);
    border-bottom: var(--border-style);
    padding: 1.5rem 1rem;
  }
  > :first-child {
    border-left: var(--border-style);
    border-top-left-radius: var(--radius-2);
    border-bottom-left-radius: var(--radius-2);
  }
  > :last-child {
    border-right: var(--border-style);
    border-top-right-radius: var(--radius-2);
    border-bottom-right-radius: var(--radius-2);
  }
`;

function HeadingCell(
  props: Readonly<JSX.HTMLAttributes<HTMLTableCellElement>>,
) {
  return <th style="padding: var(--spacing-size-7)" {...props} />;
}

function BodyCell(props: Readonly<JSX.HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td style="padding: var(--spacing-size-5) var(--spacing-size-7)" {...props}>
      <Stack gap="size2" style="align-items:start">
        {props.children}
      </Stack>
    </td>
  );
}

function SelectInput(
  props: Readonly<{
    name: string;
    options: string[];
    initialValue: string;
    onChange?: (
      params: Readonly<{ propName: string; value: string }>,
    ) => unknown;
  }>,
) {
  return (
    <SelectWrapper>
      <Select
        name={props.name}
        onChange={(e) =>
          props.onChange?.({
            propName: props.name,
            value: e.currentTarget?.value,
          })
        }
      >
        <For each={props.options}>
          {(optionValue) => (
            <option
              selected={optionValue === props.initialValue}
              value={optionValue}
            >
              {optionValue}
            </option>
          )}
        </For>
      </Select>
    </SelectWrapper>
  );
}

export function ArgsTable(
  props: Readonly<{
    args: ArgType;
    onChange?: (
      params: Readonly<{
        propName: string;
        value: string | boolean | number;
      }>,
    ) => unknown;
  }>,
): JSXElement {
  return (
    <Switch>
      <Match when={true}>
        <Stack
          as="dl"
          gutter="size2"
          style="border:1px solid var(--gray-3); padding:1rem;"
        >
          <For each={Object.entries(props.args)}>
            {([propName, details]) => (
              <>
                <dt>
                  <strong>{propName}</strong>
                </dt>

                <dd>{details.description}</dd>
                <dd>
                  <Summary>{details.summary}</Summary>
                </dd>
                <dd>
                  <strong>default value:</strong> {details.defaultValue ?? "-"}
                </dd>
                <dd>
                  <Switch>
                    <Match when={details.control === "boolean"}>
                      <input
                        type="checkbox"
                        name={propName}
                        checked={details.initialValue as boolean}
                        onChange={(e) =>
                          props.onChange?.({
                            propName,
                            value: e.currentTarget.checked,
                          })
                        }
                      />
                    </Match>
                    <Match when={details.control === "text"}>
                      <TextBox
                        name={propName}
                        value={details.initialValue as string}
                        onChange={(e) =>
                          props.onChange?.({
                            propName,
                            value: e.currentTarget.value,
                          })
                        }
                      />
                    </Match>
                    <Match when={details.control === "select"}>
                      <SelectInput
                        name={propName}
                        initialValue={details.initialValue as string}
                        options={
                          details.control === "select" ? details.options : []
                        }
                        onChange={props.onChange}
                      />
                    </Match>
                  </Switch>
                </dd>
              </>
            )}
          </For>
        </Stack>
      </Match>
      <Match when={false}>
        <table>
          <thead>
            <HeaderRow>
              <HeadingCell>Name</HeadingCell>
              <HeadingCell>Description</HeadingCell>
              <HeadingCell>Default</HeadingCell>
              <HeadingCell>Control</HeadingCell>
            </HeaderRow>
          </thead>
          <tbody>
            <For each={Object.entries(props.args)}>
              {([propName, details]) => (
                <BodyRow>
                  <BodyCell>
                    <strong>{propName}</strong>
                  </BodyCell>
                  <BodyCell>
                    <div>{details.description}</div>
                    <Summary>{details.summary}</Summary>
                  </BodyCell>
                  <BodyCell>{details.defaultValue ?? "-"}</BodyCell>
                  <BodyCell>
                    <Switch>
                      <Match when={details.control === "number"}>
                        <input
                          type="number"
                          name={propName}
                          value={details.initialValue as number}
                          onChange={(e) =>
                            props.onChange?.({
                              propName,
                              value: parseInt(e.currentTarget.value),
                            })
                          }
                        />
                      </Match>
                      <Match when={details.control === "boolean"}>
                        <input
                          type="checkbox"
                          name={propName}
                          checked={details.initialValue as boolean}
                          onChange={(e) =>
                            props.onChange?.({
                              propName,
                              value: e.currentTarget.checked,
                            })
                          }
                        />
                      </Match>
                      <Match when={details.control === "text"}>
                        <TextBox
                          name={propName}
                          value={details.initialValue as string}
                          onChange={(e) =>
                            props.onChange?.({
                              propName,
                              value: e.currentTarget.value,
                            })
                          }
                        />
                      </Match>
                      <Match when={details.control === "select"}>
                        <SelectInput
                          name={propName}
                          initialValue={details.initialValue as string}
                          options={
                            details.control === "select" ? details.options : []
                          }
                          onChange={props.onChange}
                        />
                      </Match>
                    </Switch>
                  </BodyCell>
                </BodyRow>
              )}
            </For>
          </tbody>
        </table>
      </Match>
    </Switch>
  );
}
