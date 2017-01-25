var redux = require("redux");
var {searchTextReducer, showCompletedReducer, todosReducer} = require("reducers");

export var configure = () => {
    /**
     * 調用 combineReducers
     * 將 state 結構變為 { searchText, showCompleted, todos}
     */
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    });

    var store = redux.createStore(reducer, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};