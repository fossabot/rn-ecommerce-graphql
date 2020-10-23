import React, {useEffect, useMemo, useState} from 'react';
import {getAsyncTheme, joinNestedTheme} from "../utils";
import {defaultTheme} from "../localTheme/defaultTheme.js";
import {ThemeProvider} from "react-native-elements";


export const ThemeProvider = (props) => {
    const [asyncTheme, setAsyncTheme] = useState({});

    useEffect(() => {
        (async () => {
            //append something to here
            const {data, error} = await getAsyncTheme();
            if (error) {
                console.error(error);
            } else {
                setAsyncTheme(data);
            }
        })();
    }, [])



    const theme = useMemo(() => {
            const naiveFormatTheme = joinNestedTheme(defaultTheme, asyncTheme);
            return formatTheme(naiveFormatTheme);
        }, [asyncTheme]
    )


    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
};


