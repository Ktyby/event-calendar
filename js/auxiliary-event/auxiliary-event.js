"use strict";

(() => {
  const DelaysType = {
    "second": 1000,
    "minute": 60000,
    "hour": 3600000,
    "day": 86400000,
    "thirty days": 2592000000
  };

  /**
   * 
   * @param {string} delayType type of delay
   * @param {number} numberDelay number unit of delay
   * @param {Function} auxiliaryEventFunction event function
   * @param {string} auxiliaryEventName event name
   * @param {number} eventId id of the event that the auxiliary event is being created for (This parameter is optional. You should writing it, when you want creating auxiliary event for all events).
   */

  const createAuxiliaryEvent = (delayType, numberDelay, auxiliaryEventFunction, auxiliaryEventName, eventId) => {
    const delay = DelaysType[delayType] * numberDelay;
    let auxiliaryEventDelay;
    let eventTimeout;

    /**
     * @description this function needed for set delay to one event
     */

    const detDelayForOneEvent = () => {
      window.mainModules.eventsArray.forEach((element) => {
        if (element.eventId === eventId) {
          auxiliaryEventDelay = element.eventDelay - delay;
          eventTimeout = auxiliaryEventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.mainModules.utils.getDelayToBeCalledToday(element.eventDate, element.eventTime);
        }
      });
    };

    /**
     * @description this function needed for set delay to all events
     */

    const detDelayForAllEvent = () => {
      window.mainModules.eventsArray.forEach((element) => {
        auxiliaryEventDelay = element.eventDelay - delay;
        eventTimeout = auxiliaryEventDelay <= window.mainModules.utils.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.mainModules.utils.getDelayToBeCalledToday(element.eventDate, element.eventTime);
      });
    };

    eventId ? detDelayForOneEvent() : detDelayForAllEvent();

    window.mainModules.eventsArray.push({
      auxiliaryEventFunction,
      auxiliaryEventName,
      eventId,
      eventTimeout
    });
  };

  window.mainModules.createAuxiliaryEvent = createAuxiliaryEvent;
})();
