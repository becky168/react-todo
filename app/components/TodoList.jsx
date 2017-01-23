var React = require("react");
var Todo = require("Todo");

var TodoList = React.createClass({
    render: function () {
        var {todos} = this.props;
        var renderTodos = () => {

            if (todos.length === 0) {
                return (
                    <p className="container__message">Nothing To Do</p>
                );
            }
            return todos.map((todo) => {
                // when you iterate over an array and generate multiple instances of component
                // you have to give them a unique key prop
                // this key prop is used internally by react to keep track of the individual component
                // ...todo : spread operator; the same as todo = {todo}
                //           使用展開運算符(...)在指定props的值上，是另一種更加簡化的語法，
                //           它是把已有的props物件值展開來指定這個元件中
                //           pass down every attribute in the todo object
                //           as props to the react component without explicity defined everything
                return <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
            });
        };

        return (
            <div>{renderTodos()}</div>
        );
    }
});

module.exports = TodoList;