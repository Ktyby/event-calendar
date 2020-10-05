const eventsArray = [];

const createEvent = (date, time, eventName, eventFunction) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  const delay = eventDate.getTime() - currentDate.getTime(); 

  eventsArray.push({
    eventDate,
    eventFunction,
    eventName
  });
  
  setTimeout(() => {
    eventFunction();
  }, delay);
}

