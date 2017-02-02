// var redux = require("redux");
/*
 import * as redux:
    grab all the property and put on the redux object
    since redux doesn't have default export
*/
import * as redux from "redux";
/* thunk is the default export */
import thunk from "redux-thunk"

// var {searchTextReducer, showCompletedReducer, todosReducer} = require("reducers");
import {searchTextReducer, showCompletedReducer, todosReducer} from "reducers";

export var configure = (initialState = {}) => {
    /**
     * 調用 combineReducers
     * 將 state 結構變為 { searchText, showCompleted, todos}
     */
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    });

    /**
     * createStore(reducer, [preloadedState], enhancer)
     * 创建一个 Redux store 来以存放应用中所有的 state。
     * 应用中应有且仅有一个 store。
     * 
     * redux.compose:
     *  compose all of our middleware
     */
    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};