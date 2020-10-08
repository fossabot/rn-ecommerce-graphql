import { useCallback } from 'react';
export const useSearchTrigger = props => {
  const {
    onClick
  } = props;
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  return {
    handleClick
  };
};
//# sourceMappingURL=useSearchTrigger.js.map