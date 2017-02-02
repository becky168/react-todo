var React = require("react");
var {connect} = require("react-redux");
var actions = require("actions");

export var AddTodo = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        var todoText = this.refs.todoText.value;

        if (todoText.length > 0) {
            this.refs.todoText.value = "";
            // this.props.onAddTodo(todoText);
            // dispatch(actions.addTodo(todoText));
            /* use firebase */
            dispatch(actions.startAddTodo(todoText));
        } else {
            this.refs.todoText.focus();
        }
    },
    render: function () {
        return (
            <div className="container__footer">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="todoText" placeholder="What do you need to do?"/>
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        );
    }
});

// module.exports = AddTodo;
/**
 * AddTodo doens't need any property of the state
 * so we don't have to pass any arguments to connect
 */
export default connect()(AddTodo);