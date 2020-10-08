"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccordion = void 0;

var _react = require("react");

const useAccordion = props => {
  const {
    canOpenMultiple,
    children
  } = props;
  const [openSectionIds, setOpenSectionIds] = (0, _react.useState)(new Set([]));
  const handleSectionToggle = (0, _react.useCallback)(sectionId => {
    setOpenSectionIds(prevOpenSectionIds => {
      const nextOpenSectionIds = new Set(prevOpenSectionIds);

      if (!prevOpenSectionIds.has(sectionId)) {
        // The user wants to open this section.
        // If we don't allow multiple sections to be open, close the others first.
        if (!canOpenMultiple) {
          nextOpenSectionIds.clear();
        }

        nextOpenSectionIds.add(sectionId);
      } else {
        // The user wants to close this section.
        nextOpenSectionIds.delete(sectionId);
      }

      return nextOpenSectionIds;
    });
  }, [canOpenMultiple, setOpenSectionIds]); // If any of the sections have their isOpen prop set to true initially,
  // honor that.
  // We never want to re-run this effect, even if deps change.

  /* eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(() => {
    const isOpenPropTruthy = child => child.props.isOpen;

    const initialOpenSectionIds = new Set([]);
    let firstOpenSectionId;

    _react.Children.toArray(children).forEach(child => {
      if (isOpenPropTruthy(child)) {
        const {
          id: childId
        } = child.props;
        initialOpenSectionIds.add(childId);

        if (!firstOpenSectionId) {
          firstOpenSectionId = childId;
        }
      }
    }); // If there are multiple sections with isOpen props initially set to true
    // and we only allow one, just use the first one.


    if (!canOpenMultiple && initialOpenSectionIds.size > 1) {
      initialOpenSectionIds.clear();
      initialOpenSectionIds.add(firstOpenSectionId);
    }

    setOpenSectionIds(initialOpenSectionIds);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    handleSectionToggle,
    openSectionIds
  };
};

exports.useAccordion = useAccordion;
//# sourceMappingURL=useAccordion.js.map