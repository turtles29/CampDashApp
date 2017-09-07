'use strict';

$(document).ready(function() {
    $('#settings-window').hide();
    toggleDiv();
    toggleSearch();
    toggleWeather();
    toggleQuotes();
    toggleTodo();
});

function toggleDiv() {
    $('.rotate').click(function() {
        $(this).toggleClass('down');
        $('#settings-window').toggle('slow');
    });
}

function toggleSearch() {
    $('#onoffSearch').click(function() {
        if ($(this).is(':checked')) {
            $('#search-container').show();
        } else {
            $('#search-container').hide();
        }
    });
}

function toggleWeather() {
    $('#onoffWeather').click(function() {
        if ($(this).is(':checked')) {
            $('#weather-container').show();
        } else {
            $('#weather-container').hide();
        }
    });
}

function toggleQuotes() {
    $('#onoffQuotes').click(function() {
        if ($(this).is(':checked')) {
            $('#quote-container').show();
        } else {
            $('#quote-container').hide();
        }
    });
}

function toggleTodo() {
    $('#onoffTodo').click(function() {
        if ($(this).is(':checked')) {
            $('#todo-container').show();
        } else {
            $('#todo-container').hide();
        }
    });
}
