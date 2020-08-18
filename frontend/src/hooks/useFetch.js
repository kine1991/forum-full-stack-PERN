import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if(!isLoading) return;

    axios(url, options)
      .then(response => {
        setResponse(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error.response.data)
        setIsLoading(false)
      });
  }, [isLoading]);

  return [{isLoading, response, error}, doFetch];
}


export default useFetch;
