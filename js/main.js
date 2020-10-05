const eventsArray = [];

const getDelay = (date, time) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  return eventDate.getTime() - currentDate.getTime();
}

const createEvent = (date, time, eventFunction, eventName) => {
  const eventTimeout = setTimeout(eventFunction, getDelay(date, time));

  eventsArray.push({
    eventFunction,
    eventName,
    eventTimeout
  });
}

const deleteEvent = (eventName) => {
  eventsArray.forEach((element) => {
    if (element.eventName === eventName) {
      clearTimeout(element.eventTimeout);
      eventsArray.splice(element, 1);
    }
  });
}

const editEvent = (currentEvent, newEventName, newEventDate, newEventTime) => {
  eventsArray.forEach((element) => {
    if (currentEvent === element.eventName) {
      clearTimeout(element.eventTimeout);
      element.eventTimeout = setTimeout(element.eventFunction, getDelay(newEventDate, newEventTime));
      element.eventName = newEventName;
    }
  });
}

const showListEventsFromRange = (range) => {
  switch (range) {
    case "День":

    break;
    case "":
        
    break;  
    
        
    default:
      break;
  }
}