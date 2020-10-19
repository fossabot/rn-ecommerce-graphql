import React from 'react';
import { shallow, mount } from 'enzyme';
import { Complex_UI } from './component/Complex_UI';

describe('Queries Elements', () => {
  test('with shallow and prop', () => {
    const wrapper = shallow(<Complex_UI />);
    expect(wrapper.find({ testID: 'button' })).toHaveLength(1);
  });

  test('with shallow and name', () => {
    const wrapper = shallow(<Complex_UI />);
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  test('with mount and prop', () => {
    const wrapper = mount(<Complex_UI />);
    expect(wrapper.find({ testID: 'button' }).hostNodes()).toHaveLength(1);
  });

  test('with mount and name', () => {
    const wrapper = mount(<Complex_UI />);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
});
