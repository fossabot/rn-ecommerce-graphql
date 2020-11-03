import React, {useCallback, useState} from 'react';

export const useLoading = (asyncAction) => {
  const [isLoading, setLoading] = useState(false);

  const customAction = useCallback(async () => {
    try {
      setLoading(true);
      const value = await asyncAction();
      setLoading(false);
      return value;
    } catch (e) {
      setLoading(false);
      return e;
    }
  }, []);

  return [isLoading, customAction, setLoading];
};
