import React from 'react';
import {Text, View} from "react-native";

function Product_Placeholder(props) {
    const {name} = props
    return (
        <View>
            <View style={{height: 30}}/>
            <Text>{name}</Text>
        </View>
    );
}

export {Product_Placeholder};
