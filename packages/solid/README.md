# `@bedrock-layout/solid`

All the layout primitives and solid primitives in a single package.

Full docs at: [solid.bedrock-layout.dev](https://solid.bedrock-layout.dev/)

## How to install

`npm install @bedrock-layout/solid`

or

`yarn add @bedrock-laylock/solid`

---

## Usage

```javascript
import { Stack, Inline, Split, Cover, Frame } from '@bedrock-layout/solid';

export function Hero() {
  return (
    <Stack>
      <Inline>{/* */}</Inline>
      <Split>
        <Cover>
          <Stack>
            <h1>{/* */}</h1>
            <p>{/* */}</p>
            <Inline>
              <button>{/* */}</button>
              <button>{/* */}</button>
            </Inline>
          </Stack>
        </Cover>
        <Frame>
          <img />
        </Frame>
      </Split>
    </Stack>
  );
}
```
