import {type defaultTheme as theme} from "../localTheme/defaultTheme.js";


// Join 2 themes manually. Change in theme should also be change here.
export const joinNestedTheme = (theme1: theme, theme2): theme => {
    return {
        ...theme1,
        ...theme2,
        color: {
            ...theme1?.color,
            ...theme2?.color,
        },
        font: {
            ...theme1?.font,
            ...theme2?.font,
        },
        icon: {
            ...theme1?.icon,
            ...theme2?.icon,
        }
    }
}