var redux = require("redux");
var {searchTextReducer, showCompletedReducer, todosReducer} = require("reducers");

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
     */
    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};