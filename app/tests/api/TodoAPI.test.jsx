var expect = require("expect");

var TodoAPI = require("TodoAPI");

describe("TodoAPI", () => {
    // called before each test
    beforeEach (() => {
        localStorage.removeItem("todos");
    });

    it ("should exist", () => {
        expect(TodoAPI).toExist();
    });

    describe ("setTodos", () => {
        it ("should set valid todos array", () => {
            var todos = [{
                id: 23,
                test: "test all files",
                completed: false
            }];
            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem("todos"));

            // toBe: will check the memory is the same or not
            // toEqual: use in object & array, just compared value on them
            expect(actualTodos).toEqual(todos);
        });

        it ("should not set invalid todos array", () => {
            var badTodos = {a: "b"};
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem("todos")).toBe(null);
        });
    });

    describe ("getTodos", () => {
        it ("should return empty array for bad localstorage data", () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it ("should return todo if valid array in localstorage", () => {
            var todos = [{
                id: 23,
                test: "test all files",
                completed: false
            }];
            // Not use TodoAPI.setTodos, 
            // It best to test your tests a little as possible
            localStorage.setItem("todos", JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);
        });
    });
});