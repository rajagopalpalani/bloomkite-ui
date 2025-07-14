import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

//import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

//export const history = createHistory();
function configureStoreProd(initialState) {
    const reactRouterMiddleware = routerMiddleware();
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
        reactRouterMiddleware
    ];

    return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware();
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        sagaMiddleware,
        reactRouterMiddleware
    ];

    const composeEnhancers = compose; // add support for Redux dev tools

    const loggerMiddleware = createLogger({
        predicate: () => {
            if (process.env.NODE_ENV === 'development') {
                return false;
            }
        }
    });
    middlewares.push(loggerMiddleware);

    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = configureStoreDev;

export default configureStore;
