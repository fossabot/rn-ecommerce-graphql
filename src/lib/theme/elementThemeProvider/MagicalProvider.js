import React, {useMemo} from 'react';
import {formatTheme, joinNestedTheme} from "../utils";
import {defaultTheme} from "../localTheme/defaultTheme.js";
import {ThemeProvider} from "react-native-elements";
import {styledTheme} from "../localTheme/styledTheme";


export const MagicalProvider = (props) => {
    const theme = useMemo(() => {
            // const formattedTheme = formatTheme(naiveFormatTheme);
            return formatTheme(joinNestedTheme(defaultTheme, styledTheme))
        }, []
    )

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
};


