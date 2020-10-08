import React from 'react';
import { Text, View } from 'react-native';
import { getRandomHexColor } from '../Helper/getRandomHexColor';

function StateDisplayer(props) {
  return /*#__PURE__*/React.createElement(View, {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Text, null, "----"), /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 17
    }
  }, "".concat(props.title || 'State')), /*#__PURE__*/React.createElement(Text, {
    style: {
      fontSize: 17
    }
  }, JSON.stringify(props.data, null, 2)), /*#__PURE__*/React.createElement(Text, null, "------------------------------"));
}

export default StateDisplayer;
//# sourceMappingURL=stateDisplayer.js.map