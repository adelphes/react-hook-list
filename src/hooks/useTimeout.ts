import { useCallback, useEffect, useRef, useState } from 'react';

type RestartFn = () => void;
type CancelFn = () => void;

export default function useTimeout(
  callback: (() => void) | null | undefined,
  ms?: number
): [CancelFn, RestartFn] {
  const [start, setStart] = useState(Date.now());
  const triggered = useRef(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef<(() => void) | null | undefined>();
  const [, setNoCallbackRender] = useState({});

  callbackRef.current = callback;

  useEffect(() => {
    if (triggered.current) return;
    const triggerTime = start + (ms ?? 0);
    const remaining = Math.max(triggerTime - Date.now(), 0);
    const timer = (timerRef.current = setTimeout(() => {
      triggered.current = true;
      callbackRef.current?.();
      if (!callbackRef.current) setNoCallbackRender({});
    }, remaining));
    return () => clearTimeout(timer);
  }, [ms, start]);

  const restart = useCallback(() => {
    clearTimeout(timerRef.current);
    triggered.current = false;
    setStart(Date.now());
  }, []);

  const cancel = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  return [cancel, restart];
}
