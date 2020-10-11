"use strict";

(() => {
  const NUMBER_DAY_IN_WEEK = 7;
  const ONE_DAY = 1;
  const MONTH = "Month";
  const DAY = "Day";
  const eventsArray = [];
  let idValue = 0;

  /**
   * 
   * @param {string} date this is the date, on which the event occurred
   * @param {string} time this is the time, on which the event occurred
   * @param {function} eventFunction this is the function, that called when an event occures
   * @param {string} eventName this is name of the event
   * @returns {string}
   */

  const createEvent = (date, time, eventFunction, eventName) => {
    let eventDelay = window.mainModules.utils.getDelay(date, time);
    const eventId = idValue++;

    const eventTimeout = eventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.mainModules.getDelayToBeCalledToday(date, time);

    eventsArray.push({
      eventFunction,
      eventName,
      eventTimeout,
      eventId,
      eventDate: date,
      eventTime: time,
      eventDelay,
    });

    return `Event created:
    Date: ${date}
    Time: ${time}
    Name: ${eventName}
    Event number: ${eventId}`;
  };

  /**
   * 
   * @param {number} currentId id of the event that the needed delete
   */

  const deleteEvent = (currentId) => {
    eventsArray.forEach((element) => {
      if (element.eventId === currentId) {
        clearTimeout(element.eventTimeout);
        eventsArray.splice(element, 1);
      }
    });
  };

  /**
   * 
   * @param {number} currentId id of the event that the needed edit
   * @param {string} newEventName new event name
   * @param {string} newEventDate new event date
   * @param {string} newEventTime new event time
   */

  const editEvent = (currentId, newEventName, newEventDate, newEventTime) => {
    eventsArray.forEach((element) => {
      if (currentId !== element.eventId) return;

      clearTimeout(element.eventTimeout);
      element.eventTimeout = setTimeout(element.eventFunction, window.mainModules.utils.getDelay(newEventDate, newEventTime));
      element.eventName = newEventName;
      element.eventDate = newEventDate;
      element.eventTime = newEventTime;
    });
  };

  /**
   * 
   * @param {string} range this is the range for displaying the list ("Day", "Week", "Month", "Specified interval")
   * @param {string} date  date from which to display the list
   * @param {number} interval this is the interval for displaying the list. This parameter is optional. You should writing it, when range = "Specified interval"
   */

  const showListEventsFromRange = (range, date, interval) => {
    /**
     * 
     * @param {number} dayNumber days number
     * @returns {eventsArray} return events array from range
     */
    
    const showListInRange = (dayNumber) => {
      const eventWeekDay = new Date(date).getDay(); 
      const startDate = new Date(date);
      const endDate = new Date(startDate);

      range === MONTH ? endDate.setMonth(startDate.getMonth() + 1) : endDate.setDate(startDate.getDate() + dayNumber);

      const eventsList = eventsArray.filter((element) => {
        const elementDate = new Date(element.eventDate);

        return (elementDate >= startDate && elementDate <= endDate) || (element.eventWeekDays[eventWeekDay] === window.mainModules.WEEK_DAYS[eventWeekDay]) || (element.eventType === "By selected days");
      });

      return eventsList;
    };

    switch (range) {
      case "Day":
        console.table(showListInRange(ONE_DAY));
      break;
      case "Week":
        console.table(showListInRange(NUMBER_DAY_IN_WEEK));
      break;
      case "Month":
        console.table(showListInRange(MONTH));
      break;
      case "Specified interval":
        console.table(showListInRange(interval));
      break;
    }
  };

  window.mainModules = {
    createEvent,
    deleteEvent,
    editEvent,
    showListEventsFromRange,
    eventsArray,
    idValue
  };
})();