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
                type: "SET_SEATCH_TEXT",
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
                text: "Walk the dog"
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0].text).toEqual(action.text);
        });

        it ("should toggle todo", () => {
            var todos = [{
                id: "123",
                text: "Something",
                completed: true,
                createdAt: 123,
                completedAt: 125
            }];
            var action = {
                type: "TOGGLE_TODO",
                id: "123"
            };
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toEqual(false);
            expect(res[0].completedAt).toEqual(undefined);
        });
    });
});