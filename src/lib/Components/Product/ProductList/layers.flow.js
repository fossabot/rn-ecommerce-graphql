//sort object by order from left to right

type sortObject = {
    name: string,
    type: 'ascending' | 'descending'
}

export type sortArray = Array<sortObject>


// if type = 'equal', and filterValue is an Array,
// all values in array passes
type filterObject = {
    name: string,
    filterValue: string | Array<string>,
    type: 'greater_equal' | 'greater' | 'equal' | 'less' | 'less_equal'
}

export type filterArray = Array<filterObject>