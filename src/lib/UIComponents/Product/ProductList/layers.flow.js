//sort object by order from left to right
type sortArray = Array<?{
    name: string,
    type: 'ascending' | 'descending'
}>


// if type = 'equal', and filterValue is an Array,
// all values in array passes
type filterArray = Array<?{
    name: string,
    filterValue: string | Array<string>,
    type: 'greater_equal' | 'greater' | 'equal' | 'less' | 'less_equal'
}>