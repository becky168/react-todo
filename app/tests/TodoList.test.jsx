var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var expect = require("expect");
var $ = require("jquery");

var TodoList = require("TodoList");
var Todo = require("Todo");

describe("TodoList", () => {
    it ("should exist", () => {
        expect(TodoList).toExist();
    });

    it ("should render one Todo component for each todo item", () => {
        var todos = [
            {
                id: 1,
                text: "Do something"
            }, {
                id: 2,
                text: "Check mail"
            }
        ];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        // scryRenderedComponentWithType(item to check, the class of the item you want to look for)
        //  let us check how many of the given component is rendered under the separate component
        //  let us find all nested component
        var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todoComponents.length).toBe(todos.length);
    });
});