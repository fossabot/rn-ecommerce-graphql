"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFooter = void 0;

var _client = require("@apollo/client");

/**
 *
 * @param {*} props.query the footer data query
 */
const useFooter = props => {
  const {
    query
  } = props;
  const {
    data
  } = (0, _client.useQuery)(query);
  return {
    copyrightText: data && data.storeConfig && data.storeConfig.copyright
  };
};

exports.useFooter = useFooter;
//# sourceMappingURL=useFooter.js.map