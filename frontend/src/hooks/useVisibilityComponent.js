import { useEffect, useRef, useState } from 'react';

export default function useVisibilityComponent(initialIsVisible) {
  const [isVisibleComponent, setIsVisibleComponent] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if(ref.current && !ref.current.contains(event.target)){
      setIsVisibleComponent(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [ref]);

  return { ref, isVisibleComponent, setIsVisibleComponent }
}