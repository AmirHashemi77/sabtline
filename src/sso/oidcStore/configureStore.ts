import {applyMiddleware, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer';

const configureStore = (initialState: any = {}) => {
    const middlewares = [thunk];

    /* const composeEnhancers =
         (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

     const enhancers = composeEnhancers(
         applyMiddleware(...middlewares)
     );*/

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    );

    return store;
};

export default configureStore;
