import React from "react";
import {Route, Router, IndexRoute, hashHistory} from "react-router";

import TodoApp from "TodoApp";
import Login from "Login";
import firebase from "app/firebase/";

/*
 * react router middlewawre
 */
var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) { /* not login */
        replace("/"); /* similar to  hashHistory.push("/");*/
    }
    /* wrap up the middleware */
    next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
        replace("/todos");
    }
    next();
};

export default (
    <Router history={hashHistory}>
        <Route path="/">
            {/* onEnter: when enter this route, trigger the function */}
            <Route path="todos" component={TodoApp} onEnter={requireLogin} />
            <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
        </Route>
    </Router>
);