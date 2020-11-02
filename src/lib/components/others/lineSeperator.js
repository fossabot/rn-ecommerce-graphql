import React from 'react';
import {Text} from "react-native";

function LineSeparator(props) {
    return (
        <Text>{(props.character || '-').repeat(props.times || 50)}</Text>
    );
}

export {LineSeparator};