import React, {useEffect, useState} from 'react';

export const useMount = (): boolean => {
  const [isMount, setMount] = useState(true);

  useEffect(() => {
    return () => setMount(false);
  }, []);

  return isMount;
};
