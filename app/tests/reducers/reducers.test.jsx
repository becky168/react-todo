var expect = require("expect");
/**
 * deep-freeze-strict: help test whether it is a pure function or not
 * (reducer is a pure function)
 * use it to make sure the reducer doen't have any hidden issue
 */
var df = require("deep-freeze-strict");

var reducers = require("reducers");

describe ("Reducers", () => {
    describe ("searchTextReducer", () => {
        it ("should set searchText", () => {
            /**
             * Here, not use actions generator
             * because we need to reduce dependency on other module
             */
            var action = {
                type: "SET_SEARCH_TEXT",
                searchText: "dog"
            };
            // var res = reducers.searchTextReducer("", action);
            /**
             * use deep-freeze-strict
             * df(argument)
             * if argument is being updated, the test will fail.
             * (it will throw error)
             */
            var res = reducers.searchTextReducer(df(""), df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe ("showCompletedReducer", () => {
        it ("should toggle showCompleted", () => {
            var action = {
                type: "TOGGLE_SHOW_COMPLETED"
            };
            // var res = reducers.showCompletedReducer(false, action);
            /* use deep-freeze-strict */
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe ("todosReducer", () => {
        it ("should add new todo", () => {
            var action = {
                type: "ADD_TODO",
                // text: "Walk the dog"
                todo: {
                    id: "abc123",
                    text: "Something to do",
                    completed: false,
                    createdAt: 92384275
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            // expect(res[0].text).toEqual(action.text);
            expect(res[0]).toEqual(action.todo);
        });

        // it ("should toggle todo", () => {
        //     var todos = [{
        //         id: "123",
        //         text: "Something",
        //         completed: true,
        //         createdAt: 123,
        //         completedAt: 125
        //     }];
        //     var action = {
        //         type: "TOGGLE_TODO",
        //         id: "123"
        //     };
        //     var res = reducers.todosReducer(df(todos), df(action));

        //     expect(res[0].completed).toEqual(false);
        //     expect(res[0].completedAt).toEqual(undefined);
        // });
        
        it ("should update todo", () => {
            var todos = [{
                id: "123",
                text: "Something",
                completed: true,
                createdAt: 123,
                completedAt: 125
            }];
            var updates = {
                completed: false,
                completedAt: null
            };
            var action = {
                type: "UPDATE_TODO",
                id: todos[0].id,
                updates
            };
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text); // the property not tweet still the same
        });

        it ("should add existing todos", () => {
            var todos = [{
                id: "111",
                text: "anything",
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];

            var action = {
                type: "ADD_TODOS",
                todos
            };

            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });

    describe("authReducer", () => {
        it ("should store uid on LOGIN", () => {
            const action = {
                type: "LOGIN",
                uid: "abc123"
            };
            /* authReducer:
             *  argument:
             *      undefined: use default value
             *      df(): reducer doesn't  update their input
             * res: new state of the auth
             */
            const res = reducers.authReducer(undefined, df(action));

            expect(res).toEqual({
                uid: action.uid
            });
        });

        it ("should wipe auth on LOGOUT", () => {
            const authData = {
                uid: "123abc"
            };
            const action = {
                type: "LOGOUT"
            };
            const res = reducers.authReducer(df(authData), df(action));

            expect(res).toEqual({});
        });
    });
});