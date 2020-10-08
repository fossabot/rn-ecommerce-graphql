"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCategoryTile = void 0;

var _react = require("react");

const previewImageSize = 480;
/**
 * Returns props necessary to render a CategoryTile component.
 *
 * @returns {Object} props necessary to render a category tile
 * @returns {Object} .image - an object containing url, type and width for the category image
 * @returns {Object} .item - an object containing name and url for the category tile
 */

const useCategoryTile = props => {
  const {
    item
  } = props;
  const {
    image,
    productImagePreview
  } = item;
  const imageObj = (0, _react.useMemo)(() => {
    const previewProduct = productImagePreview.items[0];

    if (image) {
      return {
        url: image,
        type: 'image-category',
        width: previewImageSize
      };
    } else if (previewProduct) {
      return {
        url: previewProduct.small_image,
        type: 'image-product',
        width: previewImageSize
      };
    } else {
      return {
        url: '',
        type: 'image-category',
        width: previewImageSize
      };
    }
  }, [image, productImagePreview]);
  const itemObject = (0, _react.useMemo)(() => ({
    name: item.name,
    url: "/".concat(item.url_key).concat(item.url_suffix)
  }), [item]);
  return {
    image: imageObj,
    item: itemObject
  };
};

exports.useCategoryTile = useCategoryTile;
//# sourceMappingURL=useCategoryTile.js.map