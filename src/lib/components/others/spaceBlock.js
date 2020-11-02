import React from 'react';
import {View} from "react-native";

function SpaceBlock(props) {
    const {value} = props;

    return (
        <View style={{height: value ?? 50}}/>
    );
}

export {SpaceBlock};
