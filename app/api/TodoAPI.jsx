var $ = require("jquery");


module.exports = {
    // setTodos: function (todos) {
    //     if ($.isArray(todos)) {
    //         localStorage.setItem("todos", JSON.stringify(todos));
    //         return todos;
    //     }
    // },
    // getTodos: function () {
    //     var stringTodos = localStorage.getItem("todos");
    //     var todos = [];

    //     try {
    //         todos = JSON.parse(stringTodos);
    //     } catch (e) {
    //         // leave todos an empty array
    //     }

    //     return $.isArray(todos) ? todos : [];

    //     // if ($.isArray(todos)) {
    //     //     return todos;
    //     // } else {
    //     //     return [];
    //     // }
    // },
    filterTodos: function (todos, showCompleted, searchText) {
        var filteredTodos = todos;

        // Filter by showCompleted
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // Filter by searchText
        filteredTodos = filteredTodos.filter((todo) => {
            var text = todo.text.toLowerCase();
            // searchText.length === 0 means that there's no input in search field
            // so we return all text found in todo
            return searchText.length === 0 || text.indexOf(searchText) > -1;
        });

        // Sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1; // a comes before b
            } else if (a.completed && !b.completed) {
                return 1; // a comes after b
            } else {
                return 0; // no resort (because a = b)
            }
        });
        return filteredTodos;
    }
};