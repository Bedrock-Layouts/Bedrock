# `@bedrock-layout/primitives`

All the primitives and hooks in a single package.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## How to install

`npm install @bedrock-layout/primitives`

or

`yarn add @bedrock-laylock/primitives`

---

## Usage

```javascript
import { Stack, Inline, Split, Cover, Frame } from '@bedrock-layout/primitives';

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
