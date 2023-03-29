// Copies structure and typing from https://react-hookz.github.io/web/?path=/docs/side-effect-useasync--example, many thanks!
import { useState } from 'react';

type AsyncFunc<Result, Args extends unknown[]> = (...params: Args) => Promise<Result>;

type ReturnType<Result, Args extends unknown[]> = [Result | undefined, (...params: Args) => unknown, Boolean, Error | null];

export const useAsync = <Result, Args extends unknown[] = unknown[]>(
  asyncFunction: AsyncFunc<Result, Args>  
): ReturnType<Result, Args> => {
  const [data, setData] = useState<Result>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [err, setErr] = useState<Error | null>(null);

  const trigger = async (...args: Args) => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await asyncFunction(...args);
      setData(result);
      setLoading(false);
      setErr(null);
    } catch (error) {
      console.error('Error in useAsync:', error);
      setData(undefined);
      setLoading(false);
      if (error instanceof Error) setErr(error);
    }
  };

  return [data, trigger, loading, err];
}
