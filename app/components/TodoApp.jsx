var React = require("react");
var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var TodoSearch = require("TodoSearch");
var uuid = require("node-uuid"); // universally unique identifier 惟一标识符 -->> uid

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: "",
            todos: [
                {
                    id: uuid(),
                    text: "Walk the dog"
                }, {
                    id: uuid(),
                    text: "Clean the yard"
                }, {
                    id: uuid(),
                    text: "Leave mail on porch"
                }, {
                    id: uuid(),
                    text: "Play video games"
                }
            ]
        };
    },
    handleAddTodo: function (text) {
        // alert(`new todo: ${text}`);
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(), // guaranteed to be unique, generate random id
                    text
                }
            ]
        });
    },
    handleSearch: function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },
    render: function () {
        var {todos} = this.state;
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={todos}/>
                <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
        );
    }
});

module.exports = TodoApp;