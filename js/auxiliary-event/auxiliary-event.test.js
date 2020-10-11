test("Test function createAuxiliaryEvent", () => {
  expect(global.mainModules.createAuxiliaryEvent("minute", 20, console.log("xaxa"), "something")).toBe(10);
});