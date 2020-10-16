import { createActions } from 'redux-actions';

const actionTypes = [
    'TOGGLE_DRAWER',
    'SET_ONLINE',
    'SET_OFFLINE',
    'TOGGLE_SEARCH',
    'EXECUTE_SEARCH',
    'SET_PAGE_LOADING'
];
const prefix = 'APP';

export default createActions(...actionTypes, { prefix });
