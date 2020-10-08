function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component } from 'react';
import { func, string } from 'prop-types';
export default class ContainerChild extends Component {
  render() {
    return this.props.render();
  }

}

_defineProperty(ContainerChild, "propTypes", {
  id: string.isRequired,
  render: func.isRequired
});
//# sourceMappingURL=containerChild.js.map