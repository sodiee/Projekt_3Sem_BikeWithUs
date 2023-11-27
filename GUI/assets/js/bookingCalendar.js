document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      dateClick: function(info) {
        window.location.href = '/bookAJourney?date=' + info.dateStr;
    }
    });
    calendar.render();
  });