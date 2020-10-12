require("../utils/utils");
require("../event/create-event");
require("./create-recurring-event");

beforeEach(() => window.mainModules.eventsArray.length = 0);

test("Test function CreateEventWithSelectType", () => {
  const someFunc = () => {
    console.log("Lives Belarus:)");
  }

  window.mainModules.createEvent("2020-10-12", "11:00", someFunc, "something", "Once");
  expect(window.mainModules.eventsArray).toHaveLength(1);
});