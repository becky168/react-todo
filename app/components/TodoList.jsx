var React = require("react");
/**
 * Connect is a companier to the Provider component
 * the Provider component provide the access to store for all of its children
 * but the children need to specify the data they like
 */
var {connect} = require("react-redux");
// var Todo = require("Todo");
/* not use ES6 destructuring 
since that will give us the access to the pure react version of the todo
in the real component we only want the connected version */
import Todo from "Todo";
var TodoAPI = require("TodoAPI");

export var TodoList = React.createClass({
    render: function () {
        // var {todos} = this.props;
        /*
        because in the export default function we return all the state
        */
        var {todos, showCompleted, searchText} = this.props;
        var renderTodos = () => {

            var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
            // if (todos.length === 0) {
            if (filteredTodos.length === 0) {
                return (
                    <p className="container__message">Nothing To Do</p>
                );
            }
            // return todos.map((todo) => {
                /* when you iterate over an array and generate multiple instances of component
                // you have to give them a unique key prop
                // this key prop is used internally by react to keep track of the individual component
                // ...todo : spread operator; the same as todo = {todo}
                //           使用展開運算符(...)在指定props的值上，是另一種更加簡化的語法，
                //           它是把已有的props物件值展開來指定這個元件中
                //           pass down every attribute in the todo object to the Todo component
                //           as props to the react component without explicity defined everything
                */

               /*
                * because we have the access to the store from children
                * we don't have to pass the data down from TodoApp
                * which means we can render TodoList without any property
                * and it can dispatch action by itself, so we don't have to have any handler
                */
                // return <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
            //     return <Todo key={todo.id} {...todo}/>
            // });

            return filteredTodos.map((todo) => {
                /* when you iterate over an array and generate multiple instances of component
                // you have to give them a unique key prop
                // this key prop is used internally by react to keep track of the individual component
                // ...todo : spread operator; the same as todo = {todo}
                //           使用展開運算符(...)在指定props的值上，是另一種更加簡化的語法，
                //           它是把已有的props物件值展開來指定這個元件中
                //           pass down every attribute in the todo object to the Todo component
                //           as props to the react component without explicity defined everything
                */

               /*
                * because we have the access to the store from children
                * we don't have to pass the data down from TodoApp
                * which means we can render TodoList without any property
                * and it can dispatch action by itself, so we don't have to have any handler
                */
                // return <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
                return <Todo key={todo.id} {...todo}/>
            });
        };

        return (
            <div>{renderTodos()}</div>
        );
    }
});

// module.exports = TodoList;
/**
 * connect() getting called after your component is created.
 * connect()(component) as the function: (just return the state you need)
 *      pass the component that we like to connect to the provider
 *      here means: do a connection to the todoList to the store
 *                  todoList component cannot request data in order to render itself.
 *                  in this case, all we need is a todo array
 *      connect(function)
            the function is the only argument that take state as the only argument
                state: the state the component want

 * connect 會接收一個函示當參數並回傳一個 Component class。
 * connect 的功用是將 dispatch 方法透過 props 的方式加到元件中。 (dispatch action to the store)
 * 我們可以透過這個函式來選取這個 component 需要 state 的哪一部分。
 *
 * by calling connect, we have access to the dispatch,
 * it is a variable on our props
 */
// module.exports = connect(
    /**
     * state: is the complete state of the app
     * {
     *     searchText,
     *     showCompleted,
     *     todos
     * }
     */
    // (state) => {
        /**
         * return the one we need
         */
//         return {
//             todos: state.todos
//         };
//     }
// )(TodoList);

export default connect(
    /* connect argument: conver the redux state to the props */
    /**
     * state: is the complete state of the app
     * {
     *     searchText,
     *     showCompleted,
     *     todos
     * }
     */
    (state) => {
        /**
         * return the one we need
         */
        // return {
        //     todos: state.todos
        // };

        /*
         * tell redux that we want to access every single item on the state tree
         */
        return state;
    }
)(TodoList);