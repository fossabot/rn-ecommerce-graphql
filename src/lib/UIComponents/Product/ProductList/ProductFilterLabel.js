import {Text, View} from "react-native";
import React from "react";

const parseOperatorToSymbol = (operatorString: string): string => {
    switch (operatorString) {
        case 'greater_equal':
            return '>='
        case 'greater':
            return '>'
        case 'equal':
            return '='
        case 'less':
            return '<'
        case 'less_equal':
            return '<='
    }
}

// Currently have View wrapper for future change (may add icon instead of asciiz
const generateFilterLabelName = (filterLayers: filterArray): Array<string> => {
    return filterLayers.map(filterLayer => {
        return (
            <View>
                <Text>
                    {`${filterLayer.name} ${parseOperatorToSymbol(filterLayer.type)} ${filterLayer.filterValue}`}
                </Text>
            </View>
        )
    })
}

export {generateFilterLabelName}