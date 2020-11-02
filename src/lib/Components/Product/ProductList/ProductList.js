import React, {useState} from 'react';
import {ScrollView, View} from "react-native";
import {Product_Placeholder} from "./placeholder/product_Placeholder.js";
import {useCatalogContext} from "../../../..";
import {Button} from "react-native-elements";
import {generateFilterLabelName} from "./ApplyingLabel/ProductFilterLabel.js";
import {generateSortLabelName} from "./ApplyingLabel/productSortLabel.js";
import {filterArray, sortArray} from './layers.flow.js'
import {getFilteredData} from "./logic/filter.js";
import {getSortedData} from "./logic/sort.js";
import {RoundSmallGreyBadge} from "../RoundSmallGreyBadge/roundSmallGreyBadge.js";
import {AutoTrimRoundSmallGreyBadge} from "../RoundSmallGreyBadge/autoTrimRoundSmallGreyBadge";

const md5 = require('md5');

const productData = [...Array(30).keys()].map((x, index) => {
    return {
        name: md5(x.toString() + index),
        size: x % 4 + 1,
        binary: (x % 2 === 0) ? 'up' : 'down',
    }
})

function ProductList(props) {

    const [catalogState,] = useCatalogContext();
    const {categories} = catalogState;
    const [sortLayers, setSortLayers] = useState([]);
    const [filterLayers, setFilterLayers] = useState([]);


    const handleSort = (sortLayers: sortArray) => {
        setSortLayers(sortLayers)
    }

    const handleFilter = (filterLayers: filterArray) => {
        setFilterLayers(filterLayers)
    }

    const renderLabels = (sortLayers: sortArray, filterLayers: filterArray) => {
        const labelList = generateSortLabelName(sortLayers)
            .concat(generateFilterLabelName(filterLayers))

        return labelList.map(label => {
            return (
                <View>
                    {label}
                    <Button title={'x'} onPress={() => {
                    }}/>
                </View>
            )
        })
    }


    return (
        <ScrollView>
            {renderLabels(filterLayers, sortLayers)}
            <AutoTrimRoundSmallGreyBadge title={'Somewhere over the rainbow'}/>
            {Platform.OS === 'ios' ? <View style={{height: 50}}/> : null}
            <Button title={'Sort me'} onPress={() => {
                handleSort([{
                    name: 'name',
                    type: 'ascending'
                }])
                console.log('Sorting')
            }}/>

            <View style={{height: 20}}/>

            <Button title={'Filter me'} onPress={() => {
                console.log('Filtering')
                handleFilter([{
                    name: 'name',
                    filterValue: 'd',
                    type: 'greater_equal'
                },
                ])
            }}/>
            <View style={{height: 20}}/>

            <Button title={'Reset me'} onPress={() => {
                console.log('Filtering')
                handleFilter([])
                handleSort([])
            }}/>

            <View style={{height: 10}}/>

            {getSortedData(getFilteredData(productData, filterLayers), sortLayers).map((value, index) => {
                return (
                    <Product_Placeholder key={md5(JSON.stringify(value))} data={value}/>
                )
            })}
        </ScrollView>
    );
}

export {ProductList};
