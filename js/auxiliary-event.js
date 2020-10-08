"use strict";

(() => {
  const DelaysType = {
    "second": 1000,
    "minute": 60000,
    "hour": 3600000,
    "day": 86400000,
    "thirty days": 2592000000
  };

  const createAuxiliaryEvent = (delayType, numberDelay, auxiliaryEventFunction, auxiliaryEventName, eventId) => {
    const delay = DelaysType[delayType] * numberDelay;
    let auxiliaryEventDelay;
    let eventTimeout;

    const detDelayForOneEvent = () => {
      eventsArray.forEach((element) => {
        if (element.eventId === eventId) {
          auxiliaryEventDelay = element.eventDelay - delay;
          eventTimeout = auxiliaryEventDelay <= window.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.utils.getDelayToBeCalledToday(element.eventDate, element.eventTime);
        }
      });
    };

    const detDelayForAllEvent = () => {
      eventsArray.forEach((element) => {
        auxiliaryEventDelay = element.eventDelay - delay;
        eventTimeout = auxiliaryEventDelay <= window.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.utils.getDelayToBeCalledToday(element.eventDate, element.eventTime);
      });
    };

    eventId ? detDelayForOneEvent() : detDelayForAllEvent();

    eventsArray.push({
      auxiliaryEventFunction,
      auxiliaryEventName,
      eventId,
      eventTimeout
    });
    console.log(eventTimeout);
  };

  window.createAuxiliaryEvent = createAuxiliaryEvent;
})();
