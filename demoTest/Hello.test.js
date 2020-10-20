import React from 'react';
import { shallow } from 'enzyme';
import { Hello } from './component/Hello.js';

test('Can hello', () => {
  const wrapper = shallow(<Hello />);
  expect(wrapper.find({ testID: 'hello' }).prop('children')).toEqual('Hello');
});
