# `@bedrock-layout/use-forwarded-ref`

When you need to use a ref and use are useing for

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## Usage

```javascript
import { useForwardedRef } from '@bedrock-layout/use-forwarded-ref';

const ForwardedRefDiv = React.forwardRef((props,ref)=>{
    const innerRef = useForwardedRef(ref)
    // do something with innerRef
    return <div ref={innerRef} {...props}>
})
```

Then in your app you would use it like this:

```javascript
const App = () => {
  const ref = React.useRef(null);
  console.log(ref.current);
  return <ForwardedRefDiv ref={ref}>{...content}</ForwardedRefDiv>;
};
```

## Config

`useForwardedRef` accepts a single config object as a second argument. The config object can have the following properties: `isStateful`. `isStateful` is a boolean that determines if the ref is stateful or not.

If `isStateful` is true, the ref will trigger a rerender when the `current` property changes. If `isStateful` is false, the ref will not trigger a rerender when the `current` property changes.

The default value is true.

For example:

```javascript
import { useForwardedRef } from '@bedrock-layout/use-forwarded-ref';

const ForwardedRefDiv = React.forwardRef((props,ref)=>{
    const innerRef = useForwardedRef(ref, {isStateful: false})
    // innerRef will not trigger a rerender when the `current` property changes
    return <div ref={innerRef} {...props}>
})
```
