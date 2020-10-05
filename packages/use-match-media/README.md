# `@bedrock-layout/use-match-media`

When you need to do logic based on the size of an element. It uses the `@bedrock-layout/use-media-query` under the hood to build an object of booleans based on the breakPoint contants

Full docs at: [bedrock-layout.dev](https://bedrock-layout.dev/)

## Usage

```javascript
import  useMatchMedia  from '@bedrock-layout/use-match-media';

const Div = React.forwardRef(props,ref)=>{
    const matchesObj = useMatchMedia()
    // do something with matchesObj
    return <div  {...props}>
}
```
