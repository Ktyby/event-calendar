require("../utils/utils");
require("../event/create-event");
require("./auxiliary-event");

beforeEach(() => window.mainModules.eventsArray.length = 0);

test("Test function createEvent", () => {
  const someFunc = () => {
    console.log("ddd");
  }

  window.mainModules.createAuxiliaryEvent("second", 20, someFunc, "something");

  expect(window.mainModules.eventsArray).toHaveLength(1);
});
