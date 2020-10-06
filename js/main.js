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
    const eventDay = new Date(date);
    
    let eventsList;

    eventsList = eventsArray.filter((element) => {
      return new Date(element.eventDate) === new Date(eventDay.setDate(eventDay.getDate() + index));
    });

    return eventsList;
  }
  

  switch (range) {
    case "Day":
      console.table(showListInRange(1));
    break;
    case "Week":
      console.table(showListInRange(7));
    break;  
        
    default:
      break;
  }
}