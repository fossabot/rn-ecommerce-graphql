"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddressCard = void 0;

var _react = require("react");

const useAddressCard = props => {
  const {
    address,
    onEdit,
    onSelection
  } = props;
  const {
    id: addressId
  } = address;
  const [hasUpdate, setHasUpdate] = (0, _react.useState)(false);
  const hasRendered = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    let updateTimer;

    if (address !== undefined) {
      if (hasRendered.current) {
        setHasUpdate(true);
        updateTimer = setTimeout(() => {
          setHasUpdate(false);
        }, 2000);
      } else {
        hasRendered.current = true;
      }
    }

    return () => {
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
    };
  }, [hasRendered, address]);
  const addressForEdit = (0, _react.useMemo)(() => {
    const {
      country_code: countryCode,
      ...addressRest
    } = address;
    return { ...addressRest,
      country: {
        code: countryCode
      }
    };
  }, [address]);
  const handleClick = (0, _react.useCallback)(() => {
    onSelection(addressId);
  }, [addressId, onSelection]);
  const handleKeyPress = (0, _react.useCallback)(event => {
    if (event.key === 'Enter') {
      onSelection(addressId);
    }
  }, [addressId, onSelection]);
  const handleEditAddress = (0, _react.useCallback)(() => {
    onEdit(addressForEdit);
  }, [addressForEdit, onEdit]);
  return {
    handleClick,
    handleEditAddress,
    handleKeyPress,
    hasUpdate
  };
};

exports.useAddressCard = useAddressCard;
//# sourceMappingURL=useAddressCard.js.map