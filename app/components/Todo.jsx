var React = require("react");
var {connect} = require("react-redux");
var moment = require("moment");
var actions = require("actions");

// PS. 會出現警告: ERROR: 'Warning: Failed form propType: 
//      You provided a `checked` prop to a form field without an `onChange` handler. 
//      This will render a read-only field. 
//      If the field should be mutable use `defaultChecked`. 
//      Otherwise, set either `onChange` or `readOnly`. 
//      Check the render method of `Todo`.'
// 因為我們沒有在checkbox 本身上做事件以至於沒有寫onclick時按下checkbox時都沒有動作
// 但因為我們已經有寫上onclick事件, 所以可以忽略他
/*  export: for use of test without create a store and provider */
export var Todo = React.createClass({
    render: function () {
        var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? "todo todo-completed" : "todo";

        var renderDate = () => {
            var message = "Created ";
            var timestamp = createdAt;

            if (completed) {
                message = "Completed ";
                timestamp = completedAt;
            }

            return message + moment.unix(timestamp).format("MMM Do YYYY, @ h:mm a");
        };
        return (
            <div className={todoClassName} onClick={() => {
                // this.props.onToggle(id); // no longer passed down after using redux
                dispatch(actions.toggleTodo(id));
            }}>
                <div>
                    <input type="checkbox" checked={completed}/>
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

// module.exports = Todo;

/**
 * by calling connect, we have access to the dispatch,
 * it is a variable on our props
 */
// module.exports = connect()(Todo);

/**
 * export a connectify component
 * expect a store to exist
 */
export default connect()(Todo);