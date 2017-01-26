var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var expect = require("expect");
var $ = require("jquery");

// var AddTodo = require("AddTodo");

/**
 * import our raw react component - the AddTodo property
 */
var {AddTodo} = require("AddTodo");

describe("AddTodo", () => {
    it ("should exist", () => {
        expect(AddTodo).toExist();
    })

    it ("should dispatch ADD_TODO when valid todo text", () => {
        var todoText = "Check mail";
        var action = {
            type: "ADD_TODO",
            text: todoText
        };
        var spy = expect.createSpy();
        // var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
        var $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($el.find("form")[0]);

        // expect(spy).toHaveBeenCalledWith(todoText);
        expect(spy).toHaveBeenCalledWith(action);
    });

    // it ("should call onAddTodo prop with valid data", () => {
    //     var todoText = "Check mail";
    //     var spy = expect.createSpy();
    //     var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
    //     var $el = $(ReactDOM.findDOMNode(addTodo));

    //     addTodo.refs.todoText.value = todoText;
    //     TestUtils.Simulate.submit($el.find("form")[0]);

    //     expect(spy).toHaveBeenCalledWith(todoText);
    // });

    // it ("should not call onAddTodo prop when invalid input", () => {
    //     var todoText = "";
    //     var spy = expect.createSpy();
    //     var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
    //     var $el = $(ReactDOM.findDOMNode(addTodo));

    //     addTodo.refs.todoText.value = todoText;
    //     TestUtils.Simulate.submit($el.find("form")[0]);

    //     expect(spy).toNotHaveBeenCalled();
    // });

    it ("should not dispatch ADD_TODO when invalid todo text", () => {
        var todoText = "";
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
        var $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($el.find("form")[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});