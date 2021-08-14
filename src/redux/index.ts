import { configureStore } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import { maculosaApi } from './api';
import * as models from './models';

const history = createBrowserHistory();

const store = configureStore({
    reducer: {
        [maculosaApi.reducerPath]: maculosaApi.reducer,
        ...models,
        router: connectRouter(history),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware(history), thunk, maculosaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { history };
export default store;
