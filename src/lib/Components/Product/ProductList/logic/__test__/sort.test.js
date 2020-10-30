import {getSortedData} from "../sort.js";
import type {sortArray} from "../../layers.flow";

const convertDataToObjectArray = (x: Array<>): Array<> => x.map(x => {
    return {
        name: x.toString()
    }
})

const data = convertDataToObjectArray([4, 153, 134, 432, 422])


describe('test sort Logic in Product list', () => {

    test('empty sortLayer', () => {
        const sortLayers = [];
        const result = getSortedData(data, sortLayers)
        const expected = convertDataToObjectArray([4, 153, 134, 432, 422])
        expect(result).toEqual(expected)
    })

    test('sort ascending', () => {
        const sortLayers = [{
            name: 'name',
            type: 'ascending',
        }];
        const result = getSortedData(data, sortLayers)
        const expected = convertDataToObjectArray([134, 153, 4, 422, 432])
        expect(result).toEqual(expected)
    })

    test('sort descending', () => {
        const sortLayers = [{
            name: 'name',
            type: 'descending',
        }];
        const result = getSortedData(data, sortLayers)
        const expected = convertDataToObjectArray(
            [134, 153, 4, 422, 432].reverse()
        )
        expect(result).toEqual(expected)
    })

    test('multiple sort', () => {
        const sortLayers = [
            {
                name: 'name',
                type: 'ascending',
            },
            {
                name: 'name',
                type: 'ascending',
            }, {
                name: 'name',
                type: 'descending',
            }
        ];
        const result = getSortedData(data, sortLayers)
        const expected = convertDataToObjectArray([134, 153, 4, 422, 432].reverse())
        expect(result).toEqual(expected)
    })
})