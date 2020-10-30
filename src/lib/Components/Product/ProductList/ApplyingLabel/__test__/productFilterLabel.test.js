import {generateFilterLabelName} from "../ProductFilterLabel.js";
import {shallow} from "enzyme";
import type {filterArray} from "../../layers.flow";

describe('render correct filter labels', () => {
    test('empty layers', () => {
        const labels = generateFilterLabelName([])
        expect(labels).toHaveLength(0)
    })

    test('have something', () => {
        const layers: filterArray = [{
            name: '1',
            filterValue: '2-1',
            type: 'equal',
        }]
        const labels = generateFilterLabelName(layers)
        expect(labels).toHaveLength(1)
    })
})