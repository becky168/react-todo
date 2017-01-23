// third-party module
var React = require("react");
var uuid = require("node-uuid"); // universally unique identifier 惟一标识符 -->> uid
var moment = require("moment");

// module write by ourselves
var TodoList = require("TodoList");
var AddTodo = require("AddTodo");
var TodoSearch = require("TodoSearch");
var TodoAPI = require("TodoAPI");

var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            showCompleted: false,
            searchText: "",
            todos: TodoAPI.getTodos()
            // todos: [
            //     {
            //         id: uuid(),
            //         text: "Walk the dog",
            //         completed: false
            //     }, {
            //         id: uuid(),
            //         text: "Clean the yard",
            //         completed: true
            //     }, {
            //         id: uuid(),
            //         text: "Leave mail on porch",
            //         completed: true
            //     }, {
            //         id: uuid(),
            //         text: "Play video games",
            //         completed: false
            //     }
            // ]
        };
    },
    handleAddTodo: function (text) {
        // alert(`new todo: ${text}`);
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(), // guaranteed to be unique, generate random id
                    text,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined
                }
            ]
        });
    },
    componentDidUpdate: function (prevProps, prevState) {
        TodoAPI.setTodos(this.state.todos);
    },
    handleToggle: function (id) {
        var updatedTodo = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? moment().unix() : undefined;
            }
            return todo;
        });

        this.setState({
            todos: updatedTodo
        });
    },
    handleSearch: function (showCompleted, searchText) {
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },
    render: function () {
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
        return (
            <div>
                <h1 className="page-title">Todo App</h1>

                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-5">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch} />
                            <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
                            <AddTodo onAddTodo={this.handleAddTodo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;