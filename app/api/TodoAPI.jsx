var $ = require("jquery");


module.exports = {
    setTodos: function (todos) {
        if ($.isArray(todos)) {
            localStorage.setItem("todos", JSON.stringify(todos));
            return todos;
        }
    },
    getTodos: function () {
        var stringTodos = localStorage.getItem("todos");
        var todos = [];

        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {
            // leave todos an empty array
        }

        return $.isArray(todos) ? todos : [];

        // if ($.isArray(todos)) {
        //     return todos;
        // } else {
        //     return [];
        // }
    }
};