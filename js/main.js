"use strict";

const NUMBER_DAY_IN_WEEK = 7;
const ONE_DAY = 1;
const eventsArray = [];
let idValue = 0;

const getDelay = (date, time) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  return eventDate.getTime() - currentDate.getTime();
}

const createEvent = (date, time, eventFunction, eventName, eventType) => {
  let eventTimeout;
  
  switch (eventType) {
    case "Once":
      eventTimeout = setTimeout(eventFunction, getDelay(date, time));
    break;
    case "Every day":
      eventTimeout = setInterval(eventFunction, getDelay(date, time));
    break;
    case "By selected days":

    break;
  }

  const eventId = idValue++;

  eventsArray.push({
    eventFunction,
    eventName,
    eventTimeout,
    eventId,
    eventType,
    eventDate: date
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

const showListEventsFromRange = (range, date) => {
  const showListInRange = (dayNumber) => {
    let eventsList;

    const startDate = new Date(date);
    const endDate = new Date(startDate);

    range === true ? endDate.setMonth(startDate.getMonth() + 3) : endDate.setDate(startDate.getDate() + dayNumber);

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
      console.table(showListInRange(true)); 
    break;
  }
}