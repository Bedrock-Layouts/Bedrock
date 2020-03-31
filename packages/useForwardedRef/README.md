# `@bedrock-layout/useForwardedRef`

When you need to use a ref and use are useing for

## Usage

```javascript
import useForwardedRef from '@bedrock-layout/useForwardedRef';

const ForwardedRefDiv = React.forwardRef(props,ref)=>{
    const innerRef = useForwardedRef(ref)
    console.log(innerRef)
    return <div ref={innerRef} {...props}>
}
```

Then in your app you would use it like this

```javascript
const App = () => {
  const ref = React.useRef();
  console.log(ref);
  return <ForwardedRefDiv ref={ref}>{...content}</ForwardedRefDiv>;
};
```

## TypeScript

If you are using TypeScript, the ref is required to be a `MutableRefObject` to function properly.
