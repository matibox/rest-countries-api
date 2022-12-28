import { useEffect } from 'react';

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: any[]
) {
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    timeout = setTimeout(callback, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, ...dependencies]);
}
