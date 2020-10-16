import React, {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import * as appTheme from '../variables'
import {asyncColor} from "../asyncColor";

//TODO: merge func
const theme = {
    ...DefaultTheme,
    ...appTheme,
    colors: {
        ...DefaultTheme.colors,
        ...appTheme.variable.colors
    }
}


export const ThemeProvider = (props) => {

    useEffect(() => {
        (async () => {
            //append something to here
            await asyncColor();
        })();
    }, [])


    return (
        <PaperProvider theme={theme}>
            {props.children}
        </PaperProvider>
    )
};


