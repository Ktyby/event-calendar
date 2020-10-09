"use strict";


(() => {
  const NUMBER_DAY_IN_WEEK = 7;
  const ONE_DAY = 1;
  const MONTH = "Month";
  const eventsArray = [];
  const isMatches = true;
  let idValue = 0;

  const createEvent = (date, time, eventFunction, eventName) => {
    const eventDelay = window.utils.getDelay(date, time);

    const eventId = idValue++;
    console.log("some");
    const eventTimeout = eventDelay <= window.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, eventDelay) : window.utils.getDelayToBeCalledToday(date, time);

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
      element.eventTimeout = setTimeout(element.eventFunction, window.utils.getDelay(newEventDate, newEventTime));
      element.eventName = newEventName;

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

  window.createEvent = createEvent;

  window.mainModule = {
    deleteEvent,
    editEvent,
    showListEventsFromRange,
    eventsArray,
    isMatches,
    idValue
  };
})();