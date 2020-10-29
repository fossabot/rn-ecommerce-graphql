import React, {useState} from 'react';
import {Text, View} from "react-native";
import {Product_Placeholder} from "./product_Placeholder";
import {useCatalogContext} from "../../../../index";
import {Button} from "react-native-elements";
import {generateFilterLabelName} from "./ProductFilterLabel";
import {generateSortLabelName} from "./productSortLabel";

function ProductList(props) {

    const [catalogState, catalogActions] = useCatalogContext();
    const {categories} = catalogState;
    const [sortObject, setSortObject] = useState({});
    const [filterObject, setFilterObject] = useState({});


    const handleSort = (sortObject: sortArray) => {
        setSortObject(sortObject)
    }

    const handleFilter = (filterObject: filterArray) => {
        setFilterObject(filterObject)
    }

    /**
     * Sort data from left to right.
     * The first layer sort all data.
     * The rest of layers only sort data in undecided_group(group that have equal values).
     *
     * @constructor
     * @param{Array<{}>}data
     * @param{sortArray}sortLayers
     * @return{Array<{}>}
     *
     * <pre>
     *
     * </pre>
     */
    const sortData = (data, sortLayers) => {
        const orderedData = data;
        let undecidedGroup = [];


    }

    /**
     * Compare 2 strings with an operator, and return Logical value of comparison.
     * <p>
     * Should an object with no attribute that is filtered against pass?
     * Currently no.
     * </p>
     *
     * @constructor
     * @param{string}x1
     * @param{string| Array<string>}x2
     * @param{string}operator
     * @return {boolean}
     *
     * <pre>
     *     compareIt('a', 'a', 'equal') -> true
     *     compareIt('a', 'b', 'equal') -> false
     *     compareIt('a', 'a', 'something_not_recognized') -> false
     * </pre>
     */

    const compareIt = (x1, x2, operator) => {
        switch (operator) {
            case 'greater_equal':
                return x1 >= x2;
            case 'greater':
                return x1 > x2;
            case 'equal':
                if (typeof x2 === 'string') {
                    return x1 === x2;
                } else {
                    return x2.indexOf(x1) !== -1;
                }
            case 'less':
                return x1 < x2;
            case 'less_equal':
                return x1 <= x2;
            default:
                console.error(`Handling undefined operator ${operator}`)
                return false
        }
    }

    /**
     *  Filter data by properties of filterObject and return what is left.
     *  @constructor
     *  @param{Array<{}>}data
     *  @param{filterArray}filterLayers
     *  @return {Array<{}>}
     */

    const filterData = (data, filterLayers) => {
        let filteredData = data;
        for (const layer in filterLayers) {
            filteredData = filteredData.filter(dataPiece => {
                return compareIt(dataPiece[layer.name], layer.value, layer.type);
            })
        }
        return filteredData;
    }


    const renderLabels = (sortObject: sortArray, filterObject: filterArray) => {
        const labelList = generateSortLabelName(sortObject)
            .concat(generateFilterLabelName(filterObject))
        return labelList.map(x => {
            return <View>
                {x}
                <Button title={'x'} onPress={() => {
                }}/>
            </View>
        })
    }


    return (
        <View>
            {renderLabels(sortObject, filterObject)}

            <Text>{JSON.stringify(categories, null, 2)}</Text>
            {[...Array(10).keys()].map(x => {
                return <Product_Placeholder key={x} name={x.toString()}/>
            })}

            <Button title={'Sort me'} onPress={() => {
            }}/>
            <Button title={'Filter me'} onPress={() => {
            }}/>

        </View>
    );
}

export {ProductList};
