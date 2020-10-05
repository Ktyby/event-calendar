const eventsArray = [];

const createEvent = (date, time, eventFunction) => {
  const currentDate = new Date();
  const eventDate = new Date(`${date}T${time}`);

  const diff = eventDate.getTime() - currentDate.getTime(); 

  eventsArray.push({
    eventDate,
    eventFunction
  });
  
  setTimeout(() => {
    eventFunction();
  }, diff);
}
