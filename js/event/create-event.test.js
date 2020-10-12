require("../utils/utils");
require("./create-event");

beforeEach(() => window.mainModules.eventsArray.length = 0);

test("Test function createEvent", () => {
  const now = new Date();
  const newDate = now.setDate(now.getDate() + 1);
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const executingDate = new Date(year, month, date, hours, minutes);
  const creationDate = new Date(newDate).toLocaleDateString().split(".").reverse().join("-");;
  const creationTime = `${hours}:${minutes}`;

  window.mainModules.createEvent(creationDate, creationTime, console.log("sss"), "something");
  const [firstEvent] = window.mainModules.eventsArray;
  expect(Object.keys(firstEvent).length).toBe(7);
  expect(firstEvent.eventDate).toBe(creationDate);
  expect(firstEvent.eventTime).toBe(creationTime);
  expect(firstEvent.eventDelay).toBeCloseTo(executingDate - new Date(), -2);
  expect(firstEvent.eventFunction).toBe(undefined);
  expect(firstEvent.eventId).toBe(0);
  expect(firstEvent.eventName).toBe('something');
  expect(firstEvent.eventTimeout).toBeDefined();
});

test("Test function deleteEvent", () => {
  window.mainModules.createEvent("2020-10-12", "11:00", console.log("sss"), "something");
  window.mainModules.deleteEvent(1);
  expect(window.mainModules.eventsArray).toHaveLength(0);
});



test("Test function showListEventsFromRange", () => {
  window.mainModules.createEvent("2020-10-12", "11:00", console.log("sss"), "something");

  expect(window.mainModules.showListEventsFromRange("Day", "2020-10-12")).toBe();
});