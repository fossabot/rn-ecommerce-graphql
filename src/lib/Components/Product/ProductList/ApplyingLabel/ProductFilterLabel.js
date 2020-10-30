import {Text, View} from "react-native";
import React from "react";
import type {filterArray} from "../layers.flow.js";

const md5 = require('md5')

const CHARACTER_LIMIT = 7;

const parseOperatorToSymbol = (operatorString: string, isMultipleValue?: boolean): string => {
    switch (operatorString) {
        case 'greater_equal':
            return '>='
        case 'greater':
            return '>'
        case 'equal':
            if (isMultipleValue) {
                return 'one of';
            } else {
                return '=';
            }
        case 'less':
            return '<'
        case 'less_equal':
            return '<='
    }
}

// Currently have View wrapper for future change (may add icon instead of asciiz
const generateFilterLabelName = (filterLayers: filterArray): Array<string> => {
    return filterLayers.map(filterLayer => {
        const operator = parseOperatorToSymbol(filterLayers.type,
            (filterLayer.filterValue instanceof Array) && filterLayer.length > 1);

        const displayString = `${filterLayer.name} ${operator} ${filterLayer.filterValue}`
        return (
            <View key={md5(displayString)}>
                <Text>
                    {/*TODO: move this to UI, leave only logic here*/}
                    {displayString.length > CHARACTER_LIMIT ? `${displayString.slice(0, CHARACTER_LIMIT)}...` : displayString}
                </Text>
            </View>
        )
    })
}

export {generateFilterLabelName}