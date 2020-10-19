import React from 'react';
import { shallow, mount } from 'enzyme';
import Hello from './component/Hello';

describe('A hello should hello user', function () {
  test('execution', () => {
    const wrapper = shallow(<Hello />);
    expect(wrapper.find({ testID: 'cute hello' }).prop('children')).toEqual(
      'Hello'
    );
  });
});
