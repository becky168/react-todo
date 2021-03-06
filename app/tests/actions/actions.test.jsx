import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

var expect = require("expect");

import firebase, {firebaseRef} from "app/firebase/";
var actions = require("actions");

/**
 * A generator that we can use to generate many distinct store,
 * and idealy per test with one mock store.
 * you don't want to share store between tests.
 *
 * 因為我們是透過redux-thunk這個middleware來達成非同步的功能，
 * 所以在test時，要能夠mock store把middleware加進去，這邊我們透過redux-mock-store，
 * 來幫助我們mock store。
 */
var createMockStore = configureMockStore([thunk]);

describe("Actions", () => {
    it ("should generate search text action", () => {
        var action = {
            type: "SET_SEARCH_TEXT",
            searchText: "Search some text"
        };
        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it ("should generate toggle show completed action", () => {
        var action = {
            type: "TOGGLE_SHOW_COMPLETED"
        };
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it ("should generate add todo action", () => {
        var action = {
            type: "ADD_TODO",
            // text: "Thing to do"
            todo: {
                id: "123abc",
                text: "Anything we like",
                completed: false,
                createAt: 0
            }
        };
        // var res = actions.addTodo(action.text);
        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    // it ("should create todo and dispatch ADD_TODO", (done) => {
    //     /*
    //      * create an empty mock store
    //      * mockStore裡面傳入會使用到的state，但這邊沒有所以放空的
    //      */
    //     const store = createMockStore({});
    //     const todoText = "My todo item";
    //     /*
    //      * 模擬dispatch action
    //      */
    //     store.dispatch(actions.startAddTodo(todoText)).then(() => {
    //         /*
    //          * after the firebase db is all done
    //          */
            
    //          * getActions: 
    //          * Return an array with all of the action we fire on the mock store
    //          *  since the store is created.
    //          * It is designed for mock store
             
    //         const actions = store.getActions();
    //         expect(actions[0]).toInclude({
    //             type: "ADD_TODO"
    //         });
    //         expect(actions[0].todo).toInclude({
    //             text: todoText
    //         });
    //         done(); // the test is done
    //     }).catch(done);
    //     /*
    //      * call done with the error object
    //      * if you call done with any arguments
    //      * it will assume the test failed and
    //      * will print the argument to the screen with error message
    //      */

    // });

    it ("should generate add todos action object", () => {
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

        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });

    // it ("should generate toggle todo action", () => {
    //     var action = {
    //         type: "TOGGLE_TODO",
    //         id: "123"
    //     };
    //     var res = actions.toggleTodo(action.id);

    //     expect(res).toEqual(action);
    // });

    it ("should generate update todo action", () => {
        var action = {
            type: "UPDATE_TODO",
            id: "123",
            updates: {completed: false}
        };
        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    it ("should generate login action object", () => {
        const action = {
            type: "LOGIN",
            uid: "123abc"
        };
        const res = actions.login(action.uid);

        expect(res).toEqual(action);
    });

    it ("should generate logout action object", () => {
        const action = {
            type: "LOGOUT"
        };
        const res = actions.logout();

        expect(res).toEqual(action);
    });

    describe("Test with firebase todos", () => {
        var testTodoRef;
        var uid;
        var todosRef;

        /*
         * beforeEach:
         *  define some code to run before every single test
         */
        beforeEach((done) => {
            // testTodoRef = firebaseRef.child("todos").push();

            // testTodoRef.set({
            //     text: "Something to do",
            //     completed: false,
            //     createdAt: 23453453
            // }).then(() => {
            //     done(); // move to the actual test case
            // });
            // /* 可以直接寫成 .then(() => done()) */

            // var todosRef = firebaseRef.child("todos");
            // /* 先移除現有的資料再增加測試的資料 */
            // todosRef.remove().then(() => {
            //     testTodoRef = firebaseRef.child("todos").push();

            //     return testTodoRef.set({
            //         text: "Something to do",
            //         completed: false,
            //         createdAt: 23453453
            //     })
            // })
            // .then(() => done()) // testTodoRef.set 的 promise
            // .catch(done);

            firebase.auth().signInAnonymously().then((user) => {
                uid = user.uid;
                todosRef = firebaseRef.child(`users/${uid}/todos`);

                return todosRef.remove();
            }).then(() => {
                /* remove 的 promise */
                testTodoRef = todosRef.push();

                return testTodoRef.set({
                    text: "Something to do",
                    completed: false,
                    createdAt: 23453453
                });
            }).then(() => done()) // testTodoRef.set 的 promise
            .catch(done);
        });
        /*
         * afterEach:
         *  define some code to run after every single test
         */
        afterEach((done) => {
            // testTodoRef.remove().then(() => done());
            todosRef.remove().then(() => done());
        });

        it ("should toggle todo and dispatch UPDATE_TODO action", (done) => {
            // const store = createMockStore({});
            const store = createMockStore({auth: {uid}});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: "UPDATE_TODO",
                    id: testTodoRef.key
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done);
            /*
             * call done with the error object
             * if you call done with any arguments
             * it will assume the test failed and
             * will print the argument to the screen with error message
             */
        });

        it ("should populate todos and dispatch ADD_TODOS", (done) => {
            // const store = createMockStore({});
            const store = createMockStore({auth: {uid}});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual("ADD_TODOS");
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual("Something to do");

                done();
            }, done);
        });

        it ("should create todo and dispatch ADD_TODO", (done) => {
            /*
             * create an empty mock store
             * mockStore裡面傳入會使用到的state，但這邊沒有所以放空的
             */
            // const store = createMockStore({});
            const store = createMockStore({auth: {uid}});
            const todoText = "My todo item";
            /*
             * 模擬dispatch action
             */
            store.dispatch(actions.startAddTodo(todoText)).then(() => {
                /*
                 * after the firebase db is all done
                 */
                /*
                 * getActions: 
                 * Return an array with all of the action we fire on the mock store
                 *  since the store is created.
                 * It is designed for mock store
                 */
                const actions = store.getActions();
                expect(actions[0]).toInclude({
                    type: "ADD_TODO"
                });
                expect(actions[0].todo).toInclude({
                    text: todoText
                });
                done(); // the test is done
            }).catch(done);
            /*
             * call done with the error object
             * if you call done with any arguments
             * it will assume the test failed and
             * will print the argument to the screen with error message
             */

        });
    });
});