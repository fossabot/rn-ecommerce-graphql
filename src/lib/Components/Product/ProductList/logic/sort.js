/**
 * Sort data from left to right.
 * The first layer sort all data.
 * TODO: The rest of layers only sort data in undecided_group(group that have equal values).
 * Currently only sort by last sort layer
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
const getSortedData = (data, sortLayers) => {
    if (sortLayers.length === 0) {
        return data
    }
    const layer = sortLayers[sortLayers.length - 1] || []

    // Immutability, in case of remove sortLayer, original data is not affected
    const returnData = Object.assign([], data)

    return returnData.sort((x, y) => {
        if (layer.type === 'ascending') {
            return x[layer.name].localeCompare(y[layer.name]);
        } else if (layer.type === 'descending') {
            return (-1) * x[layer.name].localeCompare(y[layer.name]);
        } else {
            return 1;
        }
    })
}

export {getSortedData}