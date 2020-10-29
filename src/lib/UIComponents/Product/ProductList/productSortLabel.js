// Currently have View wrapper for future change (may add icon instead of asciiz
import {Text, View} from "react-native";
import React from "react";

const generateSortLabelName = (sortLayers: sortArray): Array<string> => {
    return sortLayers.map(sortLayer => {
        if (sortLayer.type === 'ascending') {
            return (
                <View>
                    <Text>{`${sortLayer.name} ↑`}</Text>
                </View>
            )
        } else if (sortLayer.type === 'descending') {
            return (
                <View>
                    <Text>{`${sortLayer.name} ↓`}</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>{`${sortLayer.name} ?`}</Text>
                </View>
            )
        }
    })
}

export {generateSortLabelName}