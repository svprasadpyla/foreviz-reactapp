import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reducers = (state, action) => {
        if (action.type === 'USER_LOGOUT') {
            state = undefined
        }
        return rootReducer(state, action)
    }

    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    window.store = store;
    return store;
}