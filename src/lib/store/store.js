import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducers/index';


// if (process.env.NODE_ENV === `development`) {
//     const {logger} = require(`redux-logger`);
//     middlewares.push(logger);
// }

export const store = configureStore({
    reducer: reducers,
});