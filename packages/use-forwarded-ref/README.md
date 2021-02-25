# `@bedrock-layout/use-forwarded-ref`

When you need to use a ref and use are useing for

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## Usage

```javascript
import useForwardedRef from '@bedrock-layout/use-forwarded-ref';

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
