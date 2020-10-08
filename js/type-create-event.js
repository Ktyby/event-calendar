(() => {
  const WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const selectTypeCreateEvent = (date, time, eventDelay, eventFunction, eventType, weekDays) => {
    let eventTimeout;

    const showEventBySelectedDays = () => {
      const currentDate = new Date();
      const currentWeekDay = WEEK_DAYS[currentDate.getDay()];

      weekDays.forEach((element) => {
        if (weekDays[element] === currentWeekDay) {
          return eventFunction();
        }
      });
    };

    switch (eventType) {
      case "Once":
        eventTimeout = window.utils.getDelay(date, time) <= window.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, window.utils.getDelay(date, time)) : window.utils.getDelayToBeCalledToday(date, time);
      break;
      case "Every day":
        eventTimeout = setInterval(eventFunction, eventDelay);
      break;
      case "By selected days":
        eventDelay = NUMBER_MILISECONDS_IN_DAY;
        eventTimeout = setInterval(showEventBySelectedDays(), eventDelay);
      break;
    }

    eventsArray.push({
      eventFunction,
      eventName,
      eventTimeout,
      eventId,
      eventType,
      eventDate: date,
      eventTime: time,
      eventDelay: eventDelay
    });

    return `Event created:
    Date: ${date}
    Time: ${time}
    Name: ${eventName}
    Event number: ${eventId}`;
  };

  window.selectTypeCreateEvent = selectTypeCreateEvent;
})();