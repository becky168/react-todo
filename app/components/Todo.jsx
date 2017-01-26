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
 * 
 * react-redux 提供了两个重要的对象，Provider 和 connect，
 * 前者使 React 组件可被连接（connectable），
 * 后者把 React 组件和 Redux 的 store 真正连接起来。
 *
 * Provider 内的任何一个组件（比如这里的 Comp），如果需要使用 state 中的数据，
 * 就必须是「被 connect 过的」组件——使用 connect 方法对「你编写的组件（MyComp）」进行包装后的产物。
 *
 *
 * Resources: http://taobaofed.org/blog/2016/08/18/react-redux-connect/
 *
 * connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 *
 *      mapStateToProps(state, ownProps) : stateProps

            这个函数允许我们将 store 中的数据作为 props 绑定到组件上。

            const mapStateToProps = (state) => {
              return {
                count: state.count
              }
            }
            这个函数的第一个参数就是 Redux 的 store，
            我们从中摘取了 count 属性。
            因为返回了具有 count 属性的对象，所以 MyComp 会有名为 count 的 props 字段。

            class MyComp extends Component {
              render(){
                return <div>计数：{this.props.count}次</div>
              }
            }

            const Comp = connect(...args)(MyComp);

            当然，你不必将 state 中的数据原封不动地传入组件，
            可以根据 state 中的数据，动态地输出组件需要的（最小）属性。

            const mapStateToProps = (state) => {
              return {
                greaterThanFive: state.count > 5
              }
            }
 */
export default connect()(Todo);