var React = require("react");
var ReactDOM = require("react-dom");
var {Provider} = require("react-redux");
var TestUtils = require("react-addons-test-utils");
var expect = require("expect");
var $ = require("jquery");

var configureStore = require("configureStore");
var TodoApp = require("TodoApp");
// var TodoList = require("TodoList");
import TodoList from "TodoList";

describe("TodoApp", () => {
    it ("should exist", () => {
        expect(TodoApp).toExist();
    });

    it ("should render TodoList", () => {
        var store = configureStore.configure();
        /**
         * render a provider component
         */
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp />
            </Provider>
        );

        /**
         * array scryRenderedComponentsWithType(ReactComponent tree, function componentClass)
         * 找出所有组件实例，这些组件的类型为componentClass。
         *
         * here: grab the first one we found
         */
        var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

        expect(todoList.length).toEqual(1);
    });

    // it ("should add todo to the todos state on handleAddTodo", () => {
    //     var todoText = "test text";
    //     var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

    //     todoApp.setState({todos: []});
    //     todoApp.handleAddTodo(todoText);

    //     expect(todoApp.state.todos[0].text).toBe(todoText);
    //     // expect createdAt to be a number
    //     expect(todoApp.state.todos[0].createdAt).toBeA("number");
    // });

    // it ("should toggle completed value when handleToggle called", () => {
    //     var todoData = {
    //         id: 11,
    //         text: "Test features",
    //         completed: false,
    //         createdAt: 0,
    //         completedAt: undefined
    //     };

    //     var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    //     todoApp.setState({todos: [todoData]});

    //     // Check that todos first item has completed value of false
    //     expect(todoApp.state.todos[0].completed).toBe(false);
    //     // call handleToggle with 11
    //     todoApp.handleToggle(11);
    //     // Verify that value changed
    //     expect(todoApp.state.todos[0].completed).toBe(true);
    //     // expect completedAt to be a number
    //     expect(todoApp.state.todos[0].completedAt).toBeA("number");
    // });

    // Test that when toggle from true to false, completedAt get removed
    // it ("should toggle todo from completed to incompleted", () => {
    //     var todoData = {
    //         id: 11,
    //         text: "Test features",
    //         completed: true,
    //         createdAt: 0,
    //         completedAt: 123
    //     };

    //     var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    //     todoApp.setState({todos: [todoData]});

    //     // Check that todos first item has completed value of false
    //     expect(todoApp.state.todos[0].completed).toBe(true);
    //     // call handleToggle with 11
    //     todoApp.handleToggle(11);
    //     // Verify that value changed
    //     expect(todoApp.state.todos[0].completed).toBe(false);
    //     // expect completedAt to be a number
    //     expect(todoApp.state.todos[0].completedAt).toNotExist();
    // });
});