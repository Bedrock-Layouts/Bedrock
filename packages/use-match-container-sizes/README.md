# `@bedrock-layout/use-match-container-sizes`

When you need to do logic based on the size of an element. It uses the `@bedrock-layout/use-container-query` under the hood to build an object of booleans based on the breakPoint contants

## Usage

```javascript
import  useMatchContainerSizes  from '@bedrock-layout/use-match-container-sizes';

const Div = React.forwardRef(props,ref)=>{
  const [node,setRef] = React.useState(null)
    const matchesObj = useMatchContainerSizes(node)
    // do something with matchesObj
    return <div ref={setRef} {...props}>
}
```
