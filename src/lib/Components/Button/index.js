import React from 'react';
import {TouchableOpacity} from "react-native";
import {Text} from "react-native-elements";

function StylableButton(props) {
    return (
        <TouchableOpacity {...props}>
            <Text {...props}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export {StylableButton};
