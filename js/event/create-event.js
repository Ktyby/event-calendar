"use strict";

(() => {
  const NUMBER_DAY_IN_WEEK = 7;
  const ONE_DAY = 1;
  const MONTH = "Month";
  const eventsArray = [];
  let idValue = 0;

  const createEvent = (date, time, eventFunction, eventName) => {
    const eventId = idValue++;

    const eventTimeout = eventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.mainModules.getDelayToBeCalledToday(date, time);

    eventsArray.push({
      eventFunction,
      eventName,
      eventTimeout,
      eventId,
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

  const deleteEvent = (currentId) => {
    eventsArray.forEach((element) => {
      if (element.eventId === currentId) {
        clearTimeout(element.eventTimeout);
        eventsArray.splice(element, 1);
      }
    });
  };

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

  const showListEventsFromRange = (range, date, interval) => {
    const showListInRange = (dayNumber) => {
      const startDate = new Date(date);
      const endDate = new Date(startDate);

      range === MONTH ? endDate.setMonth(startDate.getMonth() + 1) : endDate.setDate(startDate.getDate() + dayNumber);

      const eventsList = eventsArray.filter((element) => {
        const elementDate = new Date(element.eventDate);
        return elementDate >= startDate && elementDate <= endDate;
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