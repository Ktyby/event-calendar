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

  const CreateEventWithSelectType = (date, time, eventFunction, eventName, eventType, weekDays) => {
    let eventDelay = window.mainModules.utils.getDelay(date, time);
    let eventTimeout;

    const eventId = window.mainModules.idValue++;

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
        eventTimeout = eventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.mainModules.utils.getDelayToBeCalledToday(date, time);
      break;
      case "Every day":
        eventTimeout = setInterval(eventFunction, eventDelay);
      break;
      case "By selected days":
        eventDelay = window.mainModules.utils.NUMBER_MILISECONDS_IN_DAY;
        eventTimeout = setInterval(showEventBySelectedDays(), eventDelay);
      break;
    }

    window.mainModules.eventsArray.push({
      eventFunction,
      eventName,
      eventTimeout,
      eventId,
      eventType,
      eventDate: date,
      eventTime: time,
      eventDelay
    });

    return `Event created:
    Date: ${date}
    Time: ${time}
    Name: ${eventName}
    Event number: ${eventId}`;
  };

  window.mainModules.createEvent = CreateEventWithSelectType;
})();