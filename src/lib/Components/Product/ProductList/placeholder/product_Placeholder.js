import React from 'react';
import {Text, View} from "react-native";

function Product_Placeholder(props) {
    const {data} = props
    return (
        <View>
            <View style={{height: 30}}/>
            <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
    );
}

export {Product_Placeholder};
