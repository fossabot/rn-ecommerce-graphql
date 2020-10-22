import React, {useEffect, useMemo, useState} from 'react';
import {DefaultTheme} from "react-native-paper";
import {Provider as PaperProvider} from "react-native-paper";
import {getAsyncColor} from "./getAsyncColor";

//TODO: merge func
const baseTheme = {
    ...DefaultTheme,
}


export const ThemeProvider = (props) => {
    const [asyncColor, setAsyncColor] = useState({})

    useEffect(() => {
        (async () => {
            //append something to here
            const {data, error} = await getAsyncColor();
            if (error) {
                console.error(error)
            } else {
                setAsyncColor(data)
            }
        })();
    }, [])

    const theme = useMemo(() => {
            return {
                ...baseTheme,
                colors: {
                    ...baseTheme.colors,
                    ...asyncColor
                }
            }
        }, [asyncColor]
    )


    return (
        <PaperProvider theme={theme}>
            {props.children}
        </PaperProvider>
    )
};


