import { useCallback, useEffect, useRef, useState } from 'react';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

/**
 *
 * @param url
 * @param config
 * @returns
 * @example
 * ```
 * const [data, error, isLoading, refresh] = useGetRequest<MyType>('https://my.url/api/getmytype');
 * ```
 */
export default function useAPI<T>(
  url: string | URL,
  config?: AxiosRequestConfig<T> & { slow?: number }
): [T | undefined, Error | undefined, boolean, () => void] {
  const urlString = url.toString();
  const [result, setResult] = useState<T | Error>();
  const [abortController, setAbortController] = useState(new AbortController());
  // init to -1 to set loading=true from the start
  const loading = useRef(-1);

  const finaliseResult = useCallback(
    (value: T | Error, ac: AbortController) => {
      loading.current -= 1;
      if (ac.signal.aborted) return;
      setResult(value);
    },
    []
  );

  const callURL = useCallback(
    (ac: AbortController) => {
      loading.current += loading.current < 0 ? 2 : 1;
      axios
        .get<T>(urlString, {
          ...config,
          signal: ac.signal,
        })
        .then(
          (res) => {
            new Promise((r) => setTimeout(() => r(res), config?.slow)).then(
              () => {
                finaliseResult(res.data, ac);
              }
            );
          },
          (err) => {
            finaliseResult(err, ac);
          }
        );
    },
    [config, finaliseResult, urlString]
  );

  useEffect(() => {
    const ac = abortController;
    if (ac.signal.aborted) {
      setAbortController(new AbortController());
      return;
    }
    callURL(ac);
    return () => ac.abort();
  }, [callURL, abortController]);

  const refresh = useCallback(() => {
    // creating a new abort controller will abort any current request
    // and start a new one via the useEffect
    setAbortController(new AbortController());
  }, []);

  const res: [T | undefined, Error | undefined, boolean, () => void] = [
    undefined,
    undefined,
    loading.current !== 0,
    refresh,
  ];
  if (result instanceof Error) {
    res[1] = result;
  } else {
    res[0] = result;
  }

  return res;
}
