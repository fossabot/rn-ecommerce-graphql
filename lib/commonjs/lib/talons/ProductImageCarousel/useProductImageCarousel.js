"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProductImageCarousel = void 0;

var _react = require("react");

var _peregrine = require("@magento/peregrine");

var _swUtils = require("@magento/venia-ui/lib/util/swUtils");

var _swMessageTypes = require("@magento/venia-ui/lib/constants/swMessageTypes");

var _images = require("@magento/venia-ui/lib/util/images");

const useProductImageCarousel = props => {
  const {
    images,
    type,
    imageWidth
  } = props;
  const [carouselState, carouselApi] = (0, _peregrine.useCarousel)(images);
  const {
    activeItemIndex,
    sortedImages
  } = carouselState;
  const {
    handlePrevious,
    handleNext,
    setActiveItemIndex
  } = carouselApi;
  const handleThumbnailClick = (0, _react.useCallback)(index => {
    setActiveItemIndex(index);
  }, [setActiveItemIndex]); // Whenever the incoming images changes reset the active item to the first.

  (0, _react.useEffect)(() => {
    setActiveItemIndex(0);
  }, [images, setActiveItemIndex]);
  (0, _react.useEffect)(() => {
    if (_swUtils.VALID_SERVICE_WORKER_ENVIRONMENT) {
      const urls = images.map(({
        file
      }) => new URL((0, _images.generateUrlFromContainerWidth)(file, imageWidth, type), location.origin).href);
      (0, _swUtils.sendMessageToSW)(_swMessageTypes.PREFETCH_IMAGES, {
        urls
      }).catch(err => {
        console.error('Unable to send PREFETCH_IMAGES message to SW', err);
      });
    }
  }, [images, imageWidth, type]);
  const currentImage = sortedImages[activeItemIndex] || {};
  const altText = currentImage.label || 'image-product';
  return {
    currentImage,
    activeItemIndex,
    altText,
    handleNext,
    handlePrevious,
    handleThumbnailClick,
    sortedImages
  };
};

exports.useProductImageCarousel = useProductImageCarousel;
//# sourceMappingURL=useProductImageCarousel.js.map