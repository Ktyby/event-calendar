"use strict";

const NUMBER_DAY_IN_WEEK = 7;
const ONE_DAY = 1;
const NUMBER_MILISECONDS_IN_DAY = 86400000;
const MAX_DELAY_IN_SET_TIMEOUT = 2147483647;
const MONTH = "Month";
const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const eventsArray = [];
let idValue = 0;

const getDelay = (date, time) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  return eventDate.getTime() - currentDate.getTime();
}

const createEvent = (date, time, eventFunction, eventName, eventType, weekDays, ) => {
  let eventTimeout;
  let eventDelay = getDelay(date, time);
  
  const getDelayToBeColledToday = () => {
    const calculateTimeUntilDay = () => {
      const daysEnd = new Date().setHours(23, 59, 59, 999);

      return daysEnd - currentDate.getTime();
    }

    const getDayInWhichOccurEvent = () => {
      setInterval(() => {
        const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");

        if (currentDate === date) {
          setTimeout(eventFunction, getDelay(date, time));
        }
      }, NUMBER_MILISECONDS_IN_DAY);
    }

    setTimeout(getDayInWhichOccurEvent, calculateTimeUntilDay());
  }

  const showEventBySelectedDays = () => {
    const currentDate = new Date();
    const currentWeekDay = WEEK_DAYS[currentDate.getDay()];

    weekDays.forEach((element) => {
      if (weekDays[element] === currentWeekDay) {
        eventFunction();
      }
    });
  }

  switch (eventType) {
    case "Once":
      eventTimeout = getDelay(date, time) <= MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(eventFunction, getDelay(date, time)) : getDelayToBeColledToday();
    break;
    case "Every day":
      eventTimeout = setInterval(eventFunction, eventDelay);
    break;
    case "By selected days":
      eventDelay = NUMBER_MILISECONDS_IN_DAY;
      eventTimeout = setInterval(showEventBySelectedDays(), eventDelay);
    break;
  }

  const eventId = idValue++;

  eventsArray.push({
    eventFunction,
    eventName,
    eventTimeout,
    eventId,
    eventType,
    eventDate: date,
    eventDelay: eventDelay
  });

  return `Event create:
  Date: ${date}
  Time: ${time}
  Name: ${eventName}
  Event number: ${eventId}`;
}

const deleteEvent = (currentId) => {
  eventsArray.forEach((element) => {
    if (element.eventId === currentId) {
      clearTimeout(element.eventTimeout);
      eventsArray.splice(element, 1);
    }
  });
}

const editEvent = (currentId, newEventName, newEventDate, newEventTime) => {
  eventsArray.forEach((element) => {
    if (currentId === element.eventId) {
      clearTimeout(element.eventTimeout);
      element.eventTimeout = setTimeout(element.eventFunction, getDelay(newEventDate, newEventTime));
      element.eventName = newEventName;
    }
  });
}

const showListEventsFromRange = (range, date, interval) => {
  const showListInRange = (dayNumber) => {
    let eventsList;

    const startDate = new Date(date);
    const endDate = new Date(startDate);

    range === "Month" ? endDate.setMonth(startDate.getMonth() + 1) : endDate.setDate(startDate.getDate() + dayNumber);

    eventsList = eventsArray.filter((element) => {
      const elementDate = new Date(element.eventDate);
      return elementDate >= startDate && elementDate <= endDate;
    });

    return eventsList;
  }
  
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
}

const createAuxiliaryEvent = (delay, reminedFunction, eventId) => {
  
}