"use strict";

(() => {
  const NUMBER_DAY_IN_WEEK = 6;
  const ONE_DAY = 1;
  const MONTH = "Month";
  const DAY = "Day";
  const WEEK = "Week";
  const SPECIFIED_INTERVAL = "Specified interval";
  const ONCE = "Once";
  const EVERY_DAY = "Every day";
  const BY_SELECTED_DAYS = "By selected days";
  const eventsArray = [];
  let idValue = 0;

  /**
   * @description this function create event
   * @param {string} date date, on which the event occurred
   * @param {string} time time, on which the event occurred
   * @param {function} eventFunction function, that called when an event occures
   * @param {string} eventName name of the event
   * @returns {string} return string with event description
   */

  const createEvent = (date, time, eventFunction, eventName) => {
    const eventDelay = window.mainModules.getDelay(date, time);
    const eventId = idValue++;

    const eventTimeout = eventDelay <= window.mainModules.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.mainModules.getDelayToBeCalledToday(date, time);

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
   * @description this function delete event
   * @param {number} currentId id of the event that the needed delete
   */

  const deleteEvent = (currentId) => {
    eventsArray.forEach((element, index) => {
      if (element.eventId === currentId) {
        clearInterval(element.eventTimeout);
        clearTimeout(element.eventTimeout);
        eventsArray.splice(index, 1);
      }
    });
  };

  /**
   * @description this function edit event
   * @param {number} currentId id of the event that the needed edit
   * @param {string} newEventName new event name
   * @param {string} newEventDate new event date
   * @param {string} newEventTime new event time
   */

  const editEvent = (currentId, newEventName, newEventDate, newEventTime) => {
    eventsArray.forEach((element) => {
      if (currentId !== element.eventId) return;
      if (element.eventType !== ONCE) return console.log("You can edit once 'Once' events");
      
      let eventDelay = window.mainModules.getDelay(newEventDate, newEventTime);
      
      clearTimeout(element.eventTimeout);
      element.eventName = newEventName;
      element.eventDate = newEventDate;
      element.eventTime = newEventTime;
      element.eventTimeout = eventDelay <= window.mainModules.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(element.eventFunction, element.eventDelay) : window.mainModules.getDelayToBeCalledToday(newEventDate, newEventTime);
    });
  };

  /**
   * @description this function show events list
   * @param {string} range this is the range for displaying the list ("Day", "Week", "Month", "Specified interval")
   * @param {string} date  date from which to display the list
   * @param {number} interval this is the interval for displaying the list. This parameter is optional. You should writing it, when range = "Specified interval"
   */

  const showListEventsFromRange = (range, date, interval) => {
    /**
     * @description this function return events array
     * @param {number} dayNumber days number
     * @returns {eventsArray} return events array from range
     */

    const showListInRange = (dayNumber) => {
      const eventWeekDay = new Date(date).getDay();
      const startDate = new Date(date);
      const endDate = new Date(startDate);

      if (range === MONTH) {
        endDate.setMonth(startDate.getMonth() + 1) 
      } else {
        endDate.setDate(startDate.getDate() + dayNumber)
      }

      const eventsList = window.mainModules.eventsArray.filter((element) => {
        const elementDate = new Date(element.eventDate);
        if (element.eventType === BY_SELECTED_DAYS) {
          if (range === DAY) {
            return element.eventWeekDays.includes(window.mainModules.WEEK_DAYS[eventWeekDay])
          }
          return range === MONTH || range === WEEK || range === SPECIFIED_INTERVAL ? element : element.eventWeekDays.includes(window.mainModules.WEEK_DAYS[eventWeekDay]);
        } else if (element.eventType === EVERY_DAY) {
          return element
        }

        return (elementDate >= startDate && elementDate <= endDate);
      });

      return eventsList;
    };

    switch (range) {
      case DAY:
        console.table(showListInRange(ONE_DAY));
      break;
      case WEEK:
        console.table(showListInRange(NUMBER_DAY_IN_WEEK));
      break;
      case MONTH:
        console.table(showListInRange(MONTH));
      break;
      case SPECIFIED_INTERVAL:
        console.table(showListInRange(interval));
      break;
    }
  };

  window.mainModules = {
    ...mainModules,
    createEvent,
    deleteEvent,
    editEvent,
    showListEventsFromRange,
    eventsArray,
    idValue
  };
})();