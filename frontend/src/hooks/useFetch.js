import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const useFetch = url => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, [isLoading]);

  useEffect(() => {
    if(!isLoading) return;

    axios(url, options)
      .then(response => {
        setIsLoading(false)
        setResponse(response.data)
      })
      .catch(error => {
        setIsLoading(false)
        setError(error.response.data)
      });
  }, [isLoading]);

  return [{ response, isLoading, error }, doFetch];
}

export default useFetch;