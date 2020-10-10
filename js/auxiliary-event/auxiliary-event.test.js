import createAuxiliaryEvent from "./auxiliary-event";

test('test function createAuxiliaryEvent', () => {
  expect(createAuxiliaryEvent("minute", 2, console.log("ddd"), "Walk")).toBe(222);
});