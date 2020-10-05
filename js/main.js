const eventsArray = [];

const createEvent = (date, time, eventFunction, eventName) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  const delay = eventDate.getTime() - currentDate.getTime(); 

  const eventTimeout = setTimeout(eventFunction, delay);

  eventsArray.push({
    eventDate,
    eventFunction,
    eventName,
    eventTimeout
  });
}