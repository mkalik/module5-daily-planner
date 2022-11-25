// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var when = ['past', 'present', 'future'];
var set;
var id;
var jscur_time = new Date();
var now = dayjs();
var cur_time = now.format('dddd, MMMM D');
var format = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
};
// var hour = time.getHours();
var time;
var hour = dayjs().hour();
var block;
var planner_blocks;
var hour_block;
var l_task;

for (var i = 9; i < 18; i++) {
    i <= 12 ? (time = String(i) + ' AM') : (time = String(i % 12) + ' PM');
    if (i < hour) {
        set = when[0];
    } else if (i == hour) {
        set = when[1];
    } else {
        set = when[2];
    }
    console.log(hour);
    console.log(set);
    // block = i;
    block = 'hour-' + i + '';
    console.log('block: ' + block);
    console.log('local console log: ' + localStorage.getItem(block));
    localStorage.getItem(block) != null
        ? (l_task = localStorage.getItem(block))
        : (l_task = '');
    hour_block = '<div id="' + block + '" class="row time-block ' + set + '">';
    // '<div id="hour-' + block + '" class="row time-block ' + set + '">';
    planner_blocks =
        '        <div class="col-2 col-md-1 hour text-center py-3">' +
        time +
        '</div>' +
        '        <textarea class="col-8 col-md-10 description" rows="3">' +
        l_task +
        '</textarea> ' +
        '        <button class="btn saveBtn col-2 col-md-1" aria-label="save"> ' +
        '          <i class="fas fa-save" aria-hidden="true"></i> ' +
        '        </button> ' +
        '      </div> ';
    console.log(i % 12);
    $(hour_block).appendTo('.container-fluid').append(planner_blocks);
}
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // var text = document.querySelector
    $(':button').click(function () {
        console.log(this);
        var c_row = $(this).parent().attr('id');
        console.log('c_row: ' + c_row);
        console.log('c_row1: ' + c_row);
        alert($('#' + c_row + '> textarea').val());
        var task = $('#' + c_row + '> textarea').val();
        localStorage.setItem(c_row, task);
    });
});

// var when = ['past', 'present', 'future'];
// var set;
// var id;
// var time = new Date();
// var hour = time.getHours();
// var block;
// var planner_blocks;
// var hour_block;

// for (var i = 9; i < 18; i++) {
//     i <= 12 ? (time = String(i) + ' AM') : (time = String(i % 12) + ' PM');
//     if (i < hour) {
//         set = when[0];
//     } else if (i == hour) {
//         set = when[1];
//     } else {
//         set = when[2];
//     }
//     console.log(hour);
//     console.log(set);
//     block = i;
//     hour_block =
//         '<div id="hour-' + block + '" class="row time-block ' + set + '">';
//     planner_blocks =
//         '        <div class="col-2 col-md-1 hour text-center py-3">' +
//         time +
//         '</div>' +
//         '        <textarea class="col-8 col-md-10 description" rows="3"> </textarea> ' +
//         '        <button class="btn saveBtn col-2 col-md-1" aria-label="save"> ' +
//         '          <i class="fas fa-save" aria-hidden="true"></i> ' +
//         '        </button> ' +
//         '      </div> ';
//     console.log(i % 12);
//     $(hour_block).appendTo('.container-fluid').append(planner_blocks);
// }

// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
// $('#currentDay').text(cur_time.toLocaleDateString('en-US', format));
$('#currentDay').text(cur_time);
// });
