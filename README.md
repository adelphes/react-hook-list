# react-hook-list

A set of React hooks to make life easier.

## useTimeout

```ts
import { useTimeout } from 'react-hook-list';

useTimeout(callback: CallbackFn, ms?: number): [CancelFn, RestartFn]
```

React-safe wrapper around [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

```tsx
const [cancel, restart] = useTimeout(
    () => console.log('callback!'),
    5000
);

return (
    <>
      <button onClick={restart}>Restart timer</button>
      <button onClick={cancel}>Cancel timer</button>
    <>
)
```

Calling `cancel()` clears any in-progress timer.

Calling `restart()` restarts the timer - any in-progress timer is cancelled.

Passing `null` or `undefined` as the callback triggers a single re-render when the timer fires.

```ts
// this will force the component to re-render after 5 seconds
useTimeout(null, 5000);
```

## useInterval

```ts
import { useInterval } from 'react-hook-list'

useInterval(callback: CallbackFn, ms?: number): [CancelFn, RestartFn]
```

React-safe wrapper around [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

```tsx
const [cancel, restart] = useInterval(
    () => console.log('callback!'),
    2000
);

return (
    <>
      <button onClick={restart}>Restart timer</button>
      <button onClick={cancel}>Cancel timer</button>
    <>
)
```

Calling `cancel()` stops any in-progress timer.

Calling `restart()` restarts the timer - any in-progress timer is cancelled.

Passing `null` or `undefined` as the callback triggers a re-render each time the timer fires.

```ts
// this will force the component to re-render every two seconds
useInterval(null, 2000);
```

Simple Clock

```tsx
import { useTimeout } from 'react-hook-list';

export const SimpleClock = () => {
  useInterval(null, 1000);
  return <>{new Date().toLocaleTimeString()}</>;
};
```

## useAPI

```ts
import { useAPI } from 'react-hook-list'

useAPI<T>(url: string | URL): [data: T, error: Error, isLoading: boolean, refresh: Function]
```

Simple wrapper around a React-safe call to a JSON API.

```typescript
type MyList = {
  values: number[];
};

const [data, error, isLoading, refresh] = useAPI<MyList>(
  'https://example.com/api/get-list'
);

console.log({
  data,
  error,
  isLoading,
});

return (
  <>
    <button onClick={refresh}>Refresh</button>
  </>
);
```

Combine with `useInterval` to poll an API endpoint:

```typescript
type MyList = {
  values: number[];
};

const [data, error, isLoading, refresh] = useAPI<MyList>(
  'https://example.com/api/get-list'
);

useInterval(refresh, 10e3);

console.log({
  data,
  error,
  isLoading,
});
```
