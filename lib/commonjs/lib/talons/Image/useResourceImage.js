"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResourceImage = void 0;

var _react = require("react");

var _useImage = require("./useImage");

/**
 * The talon for working with ResourceImages.
 * Does all the work of generating src, srcSet, and sizes attributes.
 *
 * @param {func}    props.generateSrcset - A function that returns a srcSet.
 * @param {number}  props.height - The height to request for the fallback image for browsers that don't support srcset / sizes.
 * @param {string}  props.resource - The Magento path to the image ex: /v/d/vd12-rn_main_2.jpg
 * @param {func}    props.resourceUrl - A function that returns the full URL for the Magento resource.
 * @param {string}  props.type - The Magento image type ("image-category" / "image-product"). Used to build the resource URL.
 * @param {number}  props.width - The width to request for the fallback image for browsers that don't support srcset / sizes.
 * @param {Map}     props.widths - The map of breakpoints to possible widths used to create the img's sizes attribute.
 * @param {number}   props.ratio is the image width to height ratio. Defaults to 4/5.
 */
const useResourceImage = props => {
  const {
    generateSrcset,
    generateUrl,
    height,
    resource,
    type,
    width,
    widths,
    ratio
  } = props;
  const src = (0, _react.useMemo)(() => {
    return generateUrl(resource, type)(width, height);
  }, [generateUrl, height, resource, type, width]);
  const srcSet = (0, _react.useMemo)(() => {
    return generateSrcset(resource, type, ratio);
  }, [generateSrcset, resource, type, ratio]); // Example: 100px
  // Example: (max-width: 640px) 50px, 100px

  const sizes = (0, _react.useMemo)(() => {
    if (!widths) {
      return width ? "".concat(width, "px") : '';
    }

    const result = [];

    for (const [breakpoint, width] of widths) {
      if (breakpoint !== _useImage.UNCONSTRAINED_SIZE_KEY) {
        result.push("(max-width: ".concat(breakpoint, "px) ").concat(width, "px"));
      }
    } // Add the unconstrained size at the end.


    result.push("".concat(widths.get(_useImage.UNCONSTRAINED_SIZE_KEY), "px"));
    return result.join(', ');
  }, [width, widths]);
  return {
    sizes,
    src,
    srcSet
  };
};

exports.useResourceImage = useResourceImage;
//# sourceMappingURL=useResourceImage.js.map