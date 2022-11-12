import { useCallback, useEffect, useRef, useState } from 'react';

type RestartFn = () => void;
type CancelFn = () => void;

export default function useInterval(
  callback: (() => void) | null | undefined,
  ms?: number
): [CancelFn, RestartFn] {
  const [restartCount, setRestartCount] = useState(0);
  const timerRef = useRef<NodeJS.Timer>();
  const callbackRef = useRef<(() => void) | null | undefined>();
  const [, setNoCallbackRender] = useState({});

  callbackRef.current = callback;

  useEffect(() => {
    const timer = (timerRef.current = setInterval(() => {
      callbackRef.current?.();
      if (!callbackRef.current) setNoCallbackRender({});
    }, ms));
    return () => clearInterval(timer);
  }, [restartCount, ms]);

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    setRestartCount((count) => count + 1);
  }, []);

  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  return [cancel, restart];
}
