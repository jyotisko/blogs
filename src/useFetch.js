import { useState, useEffect } from "react";
import { CORS_PROXY_SERVER_URL } from './globals';

const useFetch = url => {

  const abortController = new AbortController();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fullUrl = `${CORS_PROXY_SERVER_URL}${url}`;
    fetch(fullUrl, {
      signal: abortController.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        else return res.json();
      })
      .then(dataFromApi => {
        setData(dataFromApi);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') console.log('fetch aborted');
        else {
          setError(err.message);
          setIsPending(false);
        }
      });
    return () => abortController.abort();
  }, [url]);

  return [data, isPending, error];

};

export default useFetch;
