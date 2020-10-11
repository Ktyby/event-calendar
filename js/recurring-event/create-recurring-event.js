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

  /**
   * @description this function is needed so that the user can create recurring event
   * @param {string} date 
   * @param {string} time 
   * @param {Function} eventFunction 
   * @param {string} eventName 
   * @param {string} eventType 
   * @param {Array} weekDays
   * @returns {string} return string with event description
   */

  const CreateEventWithSelectType = (date, time, eventFunction, eventName, eventType, weekDays) => {
    let eventDelay = window.mainModules.utils.getDelay(date, time);
    let eventTimeout;

    const eventId = window.mainModules.idValue++;

    const showDailyEvent = () => {
      return setTimeout(() => {
        eventDelay = window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT;
        eventFunction();
        setInterval(eventFunction, eventDelay);
      }, eventDelay);
    }

    /**
     * @description this function is used to determine whether eventFunction should be called today
     * @returns {Function} returns timeout
     */

    const showEventsBySelectedDays = () => {
      const currentWeekDay = new Date().getDay();

      /**
       * @description this function return delay before function which will called in specific weekday
       * @returns {Function} return interval before next day
       */

      const getWeekDayInWhichOccurEvent = () => {
        return setInterval(() => {
          const currentDate = new Date();
          const stringCurrentDate = currentDate.toLocaleDateString().split(".").reverse().join("-");
          const currentWeekDay = WEEK_DAYS[currentDate.getDay()];

          weekDays.forEach((element) => {
            if (element === currentWeekDay) {
              setTimeout(eventFunction, window.mainModules.utils.getDelay(stringCurrentDate, time));
            }
          });
        }, NUMBER_MILISECONDS_IN_DAY);
      }

      if (weekDays[currentWeekDay] === WEEK_DAYS[currentWeekDay]) {
        setTimeout(eventFunction, window.mainModules.utils.getDelay(date, time));
        return setTimeout(getWeekDayInWhichOccurEvent, window.mainModules.utils.calculateTimeUntilDay());
      }

      return setTimeout(getWeekDayInWhichOccurEvent, window.mainModules.utils.calculateTimeUntilDay());
    }

    switch (eventType) {
      case "Once":
        eventTimeout = eventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.mainModules.utils.getDelayToBeCalledToday(date, time);
      break;
      case "Every day":
        eventTimeout = showDailyEvent();
      break;
      case "By selected days":
        eventTimeout = showEventsBySelectedDays();
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
      eventDelay,
      eventWeekDays: weekDays
    });

    return `Event created:
    Date: ${date}
    Time: ${time}
    Name: ${eventName}
    Event number: ${eventId}`;
  };

  window.mainModules.WEEK_DAYS = WEEK_DAYS;
  window.mainModules.createEvent = CreateEventWithSelectType;
})();