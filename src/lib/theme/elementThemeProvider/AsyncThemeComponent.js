// As theme cannot be merged directly,
// make a child component to get updateTheme prop, then update theme

import React, {useEffect} from 'react';
import {withTheme} from "react-native-elements";
import {View} from "react-native";
import {formatTheme, getAsyncTheme} from "../utils";

function AsyncThemeComponent(props) {
    const {updateTheme} = props;

    useEffect(() => {
        (async () => {
            const {data, error} = await getAsyncTheme();
            if (error) {
                console.error(error);
            } else {
                updateTheme(formatTheme(data));
            }
        })();
    }, [])


    return (
        <View/>
    );
}

export default withTheme(AsyncThemeComponent);
