import {getFilteredData} from "../filter.js";
import type {filterArray} from "../../layers.flow";

const data = [...Array(10).keys()].map((x) => {
    return {
        name: x.toString(),
        degree: (x % 2 === 1), // odd is True, even is False
    }
})
describe('Check filter logic in ProductList', () => {

    test(('filter 0 value'), () => {
        const filterArray: filterArray = []
        expect(getFilteredData(data, filterArray)).toHaveLength(10)
    })

    test(('filter 1 value'), () => {
        const filterArray: filterArray = [{
            name: 'name',
            filterValue: '4',
            type: 'greater_equal'
        }]
        expect(getFilteredData(data, filterArray)).toHaveLength(6)
    })

    test(('filter multiple value for \'equal\''), () => {
        const filterArray: filterArray = [{
            name: 'name',
            filterValue: ['4', '5', '7', 'oh no'],
            type: 'equal'
        }]
        expect(getFilteredData(data, filterArray)).toHaveLength(3)
    })

    test(('multiple filter'), () => {
        const filterArray: filterArray = [{
            name: 'name',
            filterValue: '9',
            type: 'less'
        }, {
            name: 'degree',
            filterValue: 'true',
            type: 'equal'
        }]
        expect(getFilteredData(data, filterArray)).toHaveLength(4)
    })

    test('invalid filter', () => {
        const filterArray: filterArray = [{
            name: 'name',
            filterValue: '9',
            type: 'definitely_not_an_operator'
        }]
        expect(getFilteredData(data, filterArray)).toHaveLength(0)
    })
})
