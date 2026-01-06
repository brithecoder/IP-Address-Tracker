import { useState, useEffect } from 'react';

function useFetch<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
 
  useEffect(() => {
    if (!url) return; // Don't fetch if URL is not provided
 
    const controller = new AbortController(); // For cleanup
    setData(null); // Reset data on new fetch
    setError(null); // Reset error on new fetch
    setLoading(true);
 
    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
        if(err.name !== 'AbortError') {
         setError(err);
         }
      } else {
    // Optional: Handle the case where something that isn't an Error was thrown
            setError(new Error('An unknown error occurred'));
       }
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
 
    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [url, options]); // Re-run if url or options change
 
  return { data, loading, error };
}
 
export default useFetch;