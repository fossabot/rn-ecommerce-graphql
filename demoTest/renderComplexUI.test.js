import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { Complex_UI } from './component/Complex_UI';

describe('Render Complex UI Component', () => {
  test('with shallow', () => {
    const wrapper = shallow(<Complex_UI />);
    expect(wrapper).toBeTruthy();
  });

  test('with render', () => {
    const wrapper = render(<Complex_UI />);
    expect(wrapper).toBeTruthy();
  });

  test('with mount', () => {
    const wrapper = mount(<Complex_UI />);
    expect(wrapper).toBeTruthy();
  });
});
