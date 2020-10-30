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


const compare = (x1, x2, operator) => {
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
            console.debug(`Handling undefined operator ${operator}`)
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

const getFilteredData = (data, filterLayers) => {
    let filteredData = data;
    for (const layer of filterLayers) {
        console.log(JSON.stringify(layer, null, 2))
        filteredData = filteredData.filter(dataPiece => {
            return compare(dataPiece[layer.name].toString(), layer.filterValue, layer.type);
        })
    }
    return filteredData;
}

export {getFilteredData};