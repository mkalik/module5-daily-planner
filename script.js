// TODO: add something that checks everything on the hour to see if times are current
var when = ['past', 'present', 'future'];
var set;
var jscur_time = new Date();
var now = dayjs();
var cur_time = now.format('dddd, MMMM D');
// var hour = time.getHours();
var time;
var hour = dayjs().hour(); //gets the current hour from day js.
var block;
var planner_blocks;
var hour_block;
var l_task;

for (var i = 9; i < 18; i++) {
    //populates the page with time blocks and makes sure that they are given the past present or future colors.
    i < 12
        ? (time = String(i) + ' AM')
        : i == 12 //checks to see if the time is equal to 12.
        ? (time = String(i) + ' PM') //if it is appends a PM to the 12.
        : (time = String(i % 12) + ' PM'); //if its after, converts it to 12 hour time and appends a PM to it.
    if (i < hour) {
        //gives the proper past,present, future attribute.
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
    localStorage.getItem(block) != null //populates the page with previous entries
        ? (l_task = localStorage.getItem(block))
        : (l_task = '');
    hour_block = '<div id="' + block + '" class="row time-block ' + set + '">';
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

var blocks = document.querySelector('.container-fluid').children;

setInterval(checkTime, 60 * 1000); //checks every minute to see if the current time is the right time
function checkTime() {
    //this function checks and changes the attributes of the blocks to make sure that time is correct.
    console.log('time check');
    if (hour != dayjs().hour()) {
        hour = dayjs().hour();
        var blocks = document.querySelector('.container-fluid').children;
        for (var x = 0; x < blocks.length; x++) {
            var blockTime = blocks[x].classList[2];
            var blockHour = blocks[x].id.split('-')[1];
            if (blockHour < hour) {
                blocks[x].classList.replace(blockTime, when[0]);
            } else if (blockHour > hour) {
                blocks[x].classList.replace(blockTime, when[2]);
            } else {
                blocks[x].classList.replace(blockTime, when[1]);
            }
        }
    }
}
$(function () {
    $('#currentDay').text(cur_time); // shows the current day at the top of the page.
    $(':button').click(function () {
        //allows for user interaction and storage of information.
        console.log(this);
        var c_row = $(this).parent().attr('id'); //gets id of the parent row
        console.log('c_row: ' + c_row);
        console.log('c_row1: ' + c_row);
        // alert($('#' + c_row + '> textarea').val()); this was just a test
        var task = $('#' + c_row + '> textarea').val(); //gets value of user input
        localStorage.setItem(c_row, task); //puts that value into local storage
    });
});
