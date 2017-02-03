var React = require("react");
var ReactDOM = require("react-dom");
/**
 * Provider : let you provide your store to its children
 * Provider 是使用在應用程式的根元件內，負責將唯一的 store 傳下去給其他子元件。
 * only need in the root of our application
 */
var {Provider} = require("react-redux");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");

var TodoApp = require("TodoApp");

var actions = require("actions");
var store = require("configureStore").configure();

var TodoAPI = require("TodoAPI");

/* test for firebase */
// import "./../playground/firebase/index";

/***** Initial Settings: save data in localstorage *****/
// store.subscribe(() => {
//     var state = store.getState();
//     console.log("New State", state);

//     TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

/***** Initial Settings: save data in firebase *****/
/*
 * get all of the data from firebase and pass it to the store
 */
store.dispatch(actions.startAddTodos());

/**
 * default value
 */
// store.dispatch(actions.addTodo("Clean the yard"));
// store.dispatch(actions.setSearchText("yard"));
// store.dispatch(actions.toggleShowCompleted());

// require the css that the component need only inside the component
// Load fundation
// css!: css loader
//       load css file 
//       (by default, require doesn't know how to load css file)
// style!: style loader
//       inject css to the html file, so the style actually show up
//
// 我們可以把此段註解起來設定在 webpack.config.js 的 SASS LOADER 裡
// 並在 app.scss 中引用
// require("style!css!foundation-sites/dist/css/foundation.min.css");
// fire up the foundation.
$(document).foundation();

// App css
// specify the module we want to load
// node-sass: turn sass into css file
// sass-loader: read the sass/scss file
require("style!css!sass!applicationStyles");

// path: "/" => Render IndexRoute (component = weather)
// path: "/about" => Render component = about
/*
Router:
    Router 是放置 Route 的容器，其本身不定義 routing ，真正 routing 規則由 Route 定義。

Route:
    Route 負責 URL 和對應的元件關係，可以有多個 Route 規則也可以有嵌套（nested）Routing。
像下面的例子就是每個頁面都會先載入 App 元件再載入對應 URL 的元件。

history:
Router 中有一個屬性 history 的規則，這邊使用我們使用 hashHistory，
使用 routing 將由 hash（#）變化決定。
例如：當使用者拜訪 http://www.github.com/，實際看到的會是 http://www.github.com/#/。
下列範例若是拜訪了 /about 則會看到 http://localhost:8008/#/about 並載入 App 元件再載入 About 元件。

    hashHistory : 會通過 hash 進行對應。好處是簡單易用，不用多餘設定。

path:
path 是對應 URL 的規則。
例如：<Route path="/repos/:name" component={Repos} />
/repos/torvalds 會對應到 /repos/:name 的位置，並將參數傳入 Repos 元件中。
由 this.props.params.name 取得參數。
順帶一提，若為查詢參數 /user?q=torvalds 則由 this.props.location.query.q 取得參數。

PS. IndexRoute does not have path
*/

/*
Provider:
    put any components inside to have access to our store
    In this case, we put TodoAPP to render entire application
    so the TodoApp component as well as all it children
    are going to able to access the data on the store as well as dispatch actions
*/
ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById("app")
);