'use strict';
$( document ).ready(function() {
    //hide Todo popup
    $('.todo-popup').hide();

    //call toggle todo popup
    toggleTodoDiv();

    //array for todos
    var todos = [];

    //save array of todos to local storage
    function storeTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //load todos from local storage
    function retrieveTodos() {
        var value = localStorage.getItem('todos');
        if (value !== null) {
            todos = JSON.parse(value);
        }
    }

    //append todos to array
    function pushToTodos(value) {
        var obj = {
            isDone: false,
            value: value
        };
        todos.push(obj);
    }

    //mark a todo as done
    function checkTodoAsDone(index) {
        var obj = todos[index];
        obj.isDone = true;
        storeTodos();
        displayTodoItems(todos);
    }

    //mark a todo as incomplete
    function changeTodoAsIncomplete(index) {
        var obj = todos[index];
        obj.isDone = false;
        storeTodos();
        displayTodoItems(todos);
    }

    //check if todo is done
    function isTodoCompleted(todo) {
        return todo.isDone;
    }

    //check todo value
    function valueOfTodo(todo) {
        return todo.value;
    }

    //remove completed todos
    function removeCompletedTodos() {
        for(var i = todos.length-1; i >= 0; i-- ) {
            if (isTodoCompleted (todos[i])) {
                todos.splice(i, 1);
            }
        }
    }

    //add todos to DOM
    function displayTodoItems(todos) {
        $('#todo-list').empty();

        for(var i = 0, len = todos.length; i < len; i++) {
            //copy list item from template
            var newTodoItemHtm = $('#templates').find('.todo-list-item').clone();

            //set data - order
            newTodoItemHtm.data('index', i);

            //todo value
            var value = valueOfTodo(todos[i]);

            //replace the text to use value
            newTodoItemHtm.find('span').text(value);

            //set completed class
            if (isTodoCompleted(todos[i])) {
                newTodoItemHtm.addClass('done');
                newTodoItemHtm.find('input[type="checkbox"]').prop('checked', true);
            } 

            // add the new list item to the list, finally.
            $('#todo-list').append(newTodoItemHtm);

        }
    }

    //View logic to create todo item from the input
    function createTodo() {
    // get the string value of input todo
    var newTodo = $('#newTodo').val();

    pushToTodos(newTodo);

    displayTodoItems(todos);

    storeTodos();

    // empty the input feild
    $('#newTodo').val('');
    }

    // Interface event handling

    // handle the create button logic
    $('#create-todo-btn').click(function(){
    createTodo();
    });

    // handle all the checkbox click logic, for existing checkbox and future checkbox
    $('#todo-list').delegate('input[type="checkbox"]', 'change', function(){
    var checkbox = $(this);
    var isChecked = checkbox.is(':checked');
    var index = checkbox.parents('li').data('index');

    if (isChecked) {
        checkTodoAsDone(index);
    } else {
        changeTodoAsIncomplete(index);
    }

    });

    // handle the button to clear all completed todos
    $('#clear-todo-btn').click(function() {
    removeCompletedTodos();
    storeTodos();
    displayTodoItems(todos);
    });

      //remove a todo list item by pressing x
      $('ul').on('click', '.close-t-button', function(event){
        var clickedTaskElement = $(event.target).parent();
        var clickedTaskIndex = clickedTaskElement.parent();
        var index = $(clickedTaskIndex).index();

        $(this).parent().fadeOut(400, function() {
                if (index != -1) {
                    todos.splice(index, 1); 
                    clickedTaskElement.parent().remove();
                    storeTodos();
                }
        });
        event.stopPropagation();
    });

    // Allow pressing ENTER to create new todo from the input
    $('#newTodo').on('keyup', function(event){
    if (event.keyCode === 13) {
        createTodo();
    }
    });

    retrieveTodos();
    displayTodoItems(todos);

});

//make Todo widget togle on click
function toggleTodoDiv() {
    $('#todo-button').click(function() {
            $('.todo-popup').toggle('slow');
    });
}
