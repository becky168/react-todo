var React = require("react");
var ReactDOM = require("react-dom");
var {Provider} = require("react-redux");
var TestUtils = require("react-addons-test-utils");
var expect = require("expect");
var $ = require("jquery");


import {configure} from "configureStore";
// var TodoList = require("TodoList");
/**
 * require() from NodeJS (CommonJS)
   You can have dynamic loading where the loaded module name isn't predefined /static, 
   or where you conditionally load a module only if it's "truly required" 
   (depending on certain code flow).
   Loading is synchronous.
   That means if you have multiple requires,
   they are loaded and processed one by one.

 * import from ES6
   You can use named imports to selectively load only the pieces you need. 
   That can save memory.
   Import can be asynchronous (and in current ES6 Module Loader, it in fact is)
   and can perform a little better.
 */
import ConnectedTodoList, {TodoList} from "TodoList";
// var Todo = require("Todo");
import ConnectedTodo, {Todo} from "Todo";

describe("TodoList", () => {
    it ("should exist", () => {
        expect(TodoList).toExist();
    });

    it ("should render one Todo component for each todo item", () => {
        var todos = [
            {
                id: 1,
                text: "Do something",
                completed: false,
                completedAt: undefined,
                createdAt: 500
            }, {
                id: 2,
                text: "Check mail",
                completed: false,
                completedAt: undefined,
                createdAt: 500
            }
        ];

        /**
         * pass the initial state
         */
        var store = configure({
            todos: todos
        });

        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                {/**
                  * we don't have to pass down any property since
                  * it will get data it need form the store which pass from provider
                  */}
                <ConnectedTodoList/>
            </Provider>
        );

        // var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        /*
        // scryRenderedComponentWithType(item to check, the class of the item you want to look for)
        //  let us check how many of the given component is rendered under the separate component
        //  let us find all nested component
        */
        // var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
        var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todoComponents.length).toBe(todos.length);
    });

    // it ("should render one Todo component for each todo item", () => {
    //     var todos = [
    //         {
    //             id: 1,
    //             text: "Do something"
    //         }, {
    //             id: 2,
    //             text: "Check mail"
    //         }
    //     ];

    //     var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    //     // scryRenderedComponentWithType(item to check, the class of the item you want to look for)
    //     //  let us check how many of the given component is rendered under the separate component
    //     //  let us find all nested component
    //     var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    //     expect(todoComponents.length).toBe(todos.length);
    // });

    it ("should render empty message if no todos", () => {
        var todos = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find(".container__message").length).toBe(1);
    });
});