import {joinNestedTheme} from "../joinNestedTheme.js";
import {defaultTheme} from "../../localTheme/defaultTheme.js";


describe('check capability of joinNestedObject. ', () => {
    test('join with {}', () => {
        const asyncTheme = {}
        expect(joinNestedTheme(defaultTheme, asyncTheme)).toEqual(defaultTheme)
    });

    test('join with layer 1 nested', () => {
        const asyncTheme = {
            color:
                {
                    secondary: '#d95537',
                }
        }
        const joinedTheme = joinNestedTheme(defaultTheme, asyncTheme)
        expect(joinedTheme.color.secondary).toEqual('#d95537')
        expect(joinedTheme.color.primary).toEqual(defaultTheme.color.primary)
    });

    test('join with layer 2 nested', () => {
        const asyncTheme = {
            color:
                {
                    on:{
                        primary: '#116654'
                    }
                }
        }
        const joinedTheme = joinNestedTheme(defaultTheme, asyncTheme)
        expect(joinedTheme.color.on).toEqual(asyncTheme.color.on)
    });
})