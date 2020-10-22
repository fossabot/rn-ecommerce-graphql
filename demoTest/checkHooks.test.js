import React from 'react';
import { shallow, mount } from 'enzyme';
import { State_Lifeform } from './component/State_Lifeform';
import { Effect_Lifeform } from './component/Effect_Lifeform';

describe('Test hook change', function () {
  test('Can text change by state', () => {
    const component = shallow(<State_Lifeform />);
    expect(component.find({ testID: 'text' }).props().children).toEqual(0);

    component.find({ testID: 'button' }).simulate('Press');
    component.find({ testID: 'button' }).simulate('Press');

    expect(component.find({ testID: 'text' }).props().children).toEqual(2);
  });

  test('Can text change by effect change', () => {
    const component = mount(<Effect_Lifeform />);
    const text = component.find({ testID: 'text' }).hostNodes();

    expect(text.prop('children')).toEqual('Yes useEffect 😊');
  });
});
