# `@bedrock-layout/use-container-query`

When you need to do logic based on the size of an element. Uses the ResizeObserver API. It takes a value and will return if that value is less than or equal to it.

## Usage

```javascript
import useContainerQuery from '@bedrock-layout/use-container-query';

const Div = (props) => {
    const matches = useContainerQuery(320)
    // do something with innerRef
    return <div data-bedrock-small={matches} {...props}>
}
```
