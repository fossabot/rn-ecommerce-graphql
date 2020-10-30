// Currently have View wrapper for future change (may add icon instead of asciiz
import {Text, View} from "react-native";
import React from "react";
import type {sortArray} from "../layers.flow.js";

const md5 = require('md5')

const CHARACTER_LIMIT = 7;

const generateSortLabelName = (sortLayers: sortArray): Array<string> => {
    return sortLayers.map(sortLayer => {
        let symbolica = '?'
        if (sortLayer.type === 'ascending') {
            symbolica = '↑'
        } else if (sortLayer.type === 'descending') {
            symbolica = '↓'
        }
        const displayString = `${sortLayer.name} + ${symbolica}`;

        return (
            <View key={md5(displayString)}>
                <Text>
                    {displayString.length > CHARACTER_LIMIT ? displayString.slice(0, CHARACTER_LIMIT) : displayString}
                </Text>
            </View>
        )
    })
}

export {generateSortLabelName}