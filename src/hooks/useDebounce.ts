import { useEffect, useRef } from 'react';

export function useDebounce<T>(
  callback: () => void,
  delay: number,
  dependencies: T[]
) {
  const timeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    timeout.current = setTimeout(callback, delay);

    return () => {
      if (!timeout.current) return;
      clearTimeout(timeout.current);
    };
  }, [delay, callback, ...dependencies]);
}
