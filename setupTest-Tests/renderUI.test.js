import React from "react";
import {mount, shallow, render} from 'enzyme'
import {Text} from "react-native";


describe('Render Pure UI Component', () => {
    test('Render UI with shallow', () => {
        const wrapper = shallow(<Text/>)
        expect(wrapper).toBeTruthy()
    })

    test('Render UI with render', () => {
        const wrapper = render(<Text/>)
        expect(wrapper).toBeTruthy()
    })

    test('Render UI with mount', () => {
        const wrapper = mount(<Text/>)
        expect(wrapper).toBeTruthy()
    })
})