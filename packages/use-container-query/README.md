# `@bedrock-layout/use-container-query`

When you need to do logic based on the size of an element. Uses the ResizeObserver API. It takes a value and will return if that value is less than or equal to it.

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## Usage

```javascript
import useContainerQuery from '@bedrock-layout/use-container-query';

const Div = React.forwardRef(props,ref)=>{
  const [node,setRef] = React.useState(null)
    const matches = useContainerQuery(node,320)
    // do something with matches
    return <div ref={setRef} {...props}>
}
```

Or you can provide a range

```javascript
import useContainerQuery from '@bedrock-layout/use-container-query';

const Div = React.forwardRef(props,ref)=>{
  const [node,setRef] = React.useState(null)
    const matches = useContainerQuery(node, 320, 640)
    // do something with matches
    return <div ref={setRef} {...props}>
}
```
