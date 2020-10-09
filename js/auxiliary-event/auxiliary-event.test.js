const createAuxiliaryEvent = require("createAuxiliaryEvent");

test('test function createAuxiliaryEvent', () => {
  expect(createAuxiliaryEvent("minute", 2, console.log("ddd"), "Walk")).toBe();
});