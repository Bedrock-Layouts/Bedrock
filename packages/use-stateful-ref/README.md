# `@bedrock-layout/use-stateful-ref`

When you need to use a ref and use are useing for

## Usage

```javascript
import useStatefulRef from '@bedrock-layout/use-stateful-ref';

const statefulRefDiv = (props)=>{
    const ref = useStatefulRef(ref)
    return <div ref={ref} {...props}>
}
```

Then in your app you would use it like this:

```javascript
const App = () => {
  const ref = React.useRef(null);
  console.log(ref.current);
  return <statefulRefDiv ref={ref}>{...content}</statefulRefDiv>;
};
```
