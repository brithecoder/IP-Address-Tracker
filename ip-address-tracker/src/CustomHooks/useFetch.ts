// useFetch.ts
import { useState, useEffect } from 'react';

export default function useFetch<T>(initialUrl: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(initialUrl); // Allow the URL to change

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not find that IP or Domain");
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
        if(err.name !== 'AbortError') {
         setError(err.message);
         }
      } else {
    // Optional: Handle the case where something that isn't an Error was thrown
            setError('An unknown error occurred');
      }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
   // Cleanup function: Cancels the request if the URL changes again quickly
  return () => controller.abort();
  }, [url]); // Hook refetches whenever the URL changes

  return { data, loading, error, setUrl };
}