import createAuxiliaryEvent from "./auxiliary-event";

test("Test function createAuxiliaryEvent", () => {
  expect(createAuxiliaryEvent()).toBe(10);
});