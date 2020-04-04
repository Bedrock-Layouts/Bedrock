# `@bedrock-layout/use-media-query`

When you need to do logic based on the size of the viewport. It uses the matchMedia API, it takes a value and will return if that value is less than or equal to it.

## Usage

```javascript
import useMediaQuery from '@bedrock-layout/use-media-query';

const App = () => {
    const matches = useMediaQuery("(max-width:640px)")
    // do something with matches
    return <div ref={setRef} {...props}>
}
```
