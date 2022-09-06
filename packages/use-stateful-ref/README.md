# `@bedrock-layout/use-stateful-ref`

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

React RefObjects are not stateful, or in other words, changing the `current` property on the RefObject doesn't trigger a rerender.
One can use a ref callback to updated state, but now we are no longer using RefObjects and there is great power in consistency and knowing we will be getting a
RefObject every time. `useStatefulRef` will return a RefObject that can be passed around and used just like anyother RefObject, except that changes to the `current`
property will trigger a refrender just like updating state.

## Usage

```bash
  npm install @bedrock-layout/use-stateful-ref
```

```javascript
import { useStatefulRef } from '@bedrock-layout/use-stateful-ref';

const App = () => {
  const ref = useStatefulRef(null);
  //... Use the ref object will trigger a rerender
  return <Div ref={ref}>{...content}</Div>;
};
```
