var uuid = require("node-uuid");
var moment = require("moment");

export var searchTextReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_SEARCH_TEXT":
            return action.searchText;
        default:
            return state;
    }
};

export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW_COMPLETED":
            return !state;
        default:
            return state;
    }
};

export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                // {
                //     id: uuid(),
                //     text: action.text,
                //     completed: false,
                //     createdAt: moment().unix(),
                //     completedAt: undefined
                // }
                action.todo// to save to the firebase
            ];
        // case "TOGGLE_TODO":
        //     return state.map((todo) => {
        //         if (todo.id === action.id) {
        //             var nextCompleted = !todo.completed;

        //             return {
        //                 ...todo,
        //                 completed: nextCompleted,
        //                 completedAt: nextCompleted ? moment().unix() : undefined
        //             };
        //         } else {
        //             return todo;
        //         }
        //     });
        case "UPDATE_TODO":
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return {
                        ...todo,
                        ...action.updates 
                        /* 
                         * when you use one spread operator after another,
                         * everything from the second one will override the first one
                         */
                    };
                } else {
                    return todo;
                }
            });
        case "ADD_TODOS":
            return [
                ...state,
                ...action.todos
            ];
        case "LOGOUT":
            return []; /* wipe out all the state */
        default:
            return state;
    }
};

export var authReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                uid: action.uid
            };
        case "LOGOUT":
            return {};
        default:
            return state;
    }
};