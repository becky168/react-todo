var React = require("react");
var moment = require("moment");

// PS. 會出現警告: ERROR: 'Warning: Failed form propType: 
//      You provided a `checked` prop to a form field without an `onChange` handler. 
//      This will render a read-only field. 
//      If the field should be mutable use `defaultChecked`. 
//      Otherwise, set either `onChange` or `readOnly`. 
//      Check the render method of `Todo`.'
// 因為我們沒有在checkbox 本身上做事件以至於沒有寫onclick時按下checkbox時都沒有動作
// 但因為我們已經有寫上onclick事件, 所以可以忽略他
var Todo = React.createClass({
    render: function () {
        var {id, text, completed, createdAt, completedAt} = this.props;
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
            <div onClick={() => {
                this.props.onToggle(id);
            }}>
                <input type="checkbox" checked={completed}/>
                <p>{text}</p>
                <p>{renderDate()}</p>
            </div>
        );
    }
});

module.exports = Todo;