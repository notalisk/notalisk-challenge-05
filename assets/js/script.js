$(function () {

  var today = dayjs();

  // set the date in the header
  $("#currentDay").text(`Today is ${today.format("MMM D, YYYY")}`);

  var calEvents = JSON.parse(localStorage.getItem("calendarEvents"));

  // save user input to local storage
  $("button").click(function() {
    
    var hour = $(this).parent().attr("id");
    hour = hour.slice(5);

    var thisEvent = {
      eventName: $(this).prev("textarea").val(),
      time: hour
    }

    if (Array.isArray(calEvents)) {
      calEvents.push(thisEvent);
    } else {
      calEvents = [""];
      calEvents.push(thisEvent);
      calEvents.splice(0, 1);
    }

    localStorage.setItem("calendarEvents", JSON.stringify(calEvents));

    render();
  });

  // check local storage for stored calendar entries
  function render () {
    var calEvents = JSON.parse(localStorage.getItem("calendarEvents"));

    for (var i = 0; i < calEvents.length; i++) {
      var eventTime = "hour-" + calEvents[i].time;

      var textareaEl = document.getElementById(eventTime).children[1];
      var content = calEvents[i].eventName;

      textareaEl.value = content;
    }

     compare();
  }

  render();

  // timer
  var timerInterval = setInterval(render, 10000);

  function compare() {
    var blocks = $("button").parent();
    var ourHour = today.format("H");

    for (var i = 0; i < blocks.length; i++) {
      if (ourHour == i + 9) {
        blocks[i].className = "row time-block present";
      } else if (ourHour < i + 9) {
        blocks[i].className = "row time-block future";
      } else if (ourHour > i + 9) {
        blocks[i].className = "row time-block past";
      }
    }
  }
});
