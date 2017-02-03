var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var expect = require("expect");
var $ = require("jquery");

/*
 * PS. require is supported by webpack
 *     import is supported by ES6
 */
import * as actions from "actions";

// var Todo = require("Todo");
/**
 * Todo.jsx 中 export Todo
 * so here we use ES6 destructuring
 */
// var {Todo} = require("Todo");
import {Todo} from "Todo";

describe("Todo", () => {
    it ("should exist", () => {
        expect(Todo).toExist();
    });

    // it ("should call onToggle prop with on click", () => {
    //     var todoData = {
    //         id: 199,
    //         text: "Write todo.test.jsx test",
    //         completed: true
    //     };

    //     var spy = expect.createSpy();
    //     var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy} />);
    //     var $el = $(ReactDOM.findDOMNode(todo));

    //     TestUtils.Simulate.click($el[0]);

    //     expect(spy).toHaveBeenCalledWith(199);
    // });

    // it ("should dispatch TOGGLE_TODO action on click", () => {
    //     var todoData = {
    //         id: 199,
    //         text: "Write todo.test.jsx test",
    //         completed: true
    //     };

    //     var spy = expect.createSpy();
    //     var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);
    //     var $el = $(ReactDOM.findDOMNode(todo));

    //     TestUtils.Simulate.click($el[0]);

    //     expect(spy).toHaveBeenCalledWith({
    //         type: "TOGGLE_TODO",
    //         id: todoData.id
    //     });
    // });

    it ("should dispatch TOGGLE_TODO action on click", () => {
        var todoData = {
            id: 199,
            text: "Write todo.test.jsx test",
            completed: true
        };
        var action = actions.startToggleTodo(todoData.id, !todoData.completed);

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);
        var $el = $(ReactDOM.findDOMNode(todo));

        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });
});