"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCarousel = void 0;

var _react = require("react");

const sortImages = (images = []) => images.filter(({
  disabled
}) => !disabled).sort((a, b) => a.position - b.position);
/**
 * A hook for interacting with the state of a carousel of images.
 *
 * @param {Array} images an array of image objects
 * @param {number} startIndex the index at which to start the carousel
 */


const useCarousel = (images = [], startIndex = 0) => {
  const [activeItemIndex, setActiveItemIndex] = (0, _react.useState)(startIndex);
  const sortedImages = (0, _react.useMemo)(() => sortImages(images), [images]);
  const handlePrevious = (0, _react.useCallback)(() => {
    // If we're on the first image we want to go to the last.
    setActiveItemIndex(prevIndex => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return images.length - 1;
      }
    });
  }, [images]);
  const handleNext = (0, _react.useCallback)(() => {
    // If we're on the last image we want to go to the first.
    setActiveItemIndex(prevIndex => (prevIndex + 1) % images.length);
  }, [images]);
  const api = (0, _react.useMemo)(() => ({
    handlePrevious,
    handleNext,
    setActiveItemIndex
  }), [handlePrevious, handleNext, setActiveItemIndex]);
  const state = {
    activeItemIndex,
    sortedImages
  };
  return [state, api];
};

exports.useCarousel = useCarousel;
//# sourceMappingURL=useCarousel.js.map