"use strict";

(() => {
  const DelaysType = {
    "second": 1000,
    "minute": 60000,
    "hour": 3600000,
    "day": 86400000,
    "thirty days": 2592000000
  };

  let idValue = 0;

  /**
   * @description this function is needed so that the user can create auxiliary event
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

    const auxiliaryEventId = idValue++;

    /**
     * @description this function needed for set delay to one event
     */

    const getDelayForOneEvent = () => {
      window.mainModules.eventsArray.forEach((element) => {
        if (element.eventId === eventId && element.eventType) {
          auxiliaryEventDelay = +new Date(element.eventDelay - delay) - +new Date();
          eventTimeout = auxiliaryEventDelay <= window.mainModules.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.mainModules.getDelayToBeCalledToday(element.eventDate, element.eventTime, auxiliaryEventDelay);
        }
      });
    };

    /**
     * @description this function needed for set delay to all events
     */

    const getDelayForAllEvent = () => {
      window.mainModules.eventsArray.forEach((element) => {
        if (element.eventType) {
          auxiliaryEventDelay = new Date(element.eventDelay - delay) - new Date();
          eventId = `${auxiliaryEventId}`;
          
          if (element.eventType === "Every day") {
            setTimeout(() => {
              auxiliaryEventFunction();
              const eventDelay = window.mainModules.NUMBER_MILISECONDS_IN_DAY;
              setInterval(auxiliaryEventFunction, eventDelay);
            }, auxiliaryEventDelay);  
          }

          eventTimeout = auxiliaryEventDelay <= window.mainModules.MAX_DELAY_IN_SET_TIMEOUT ? setTimeout(auxiliaryEventFunction, auxiliaryEventDelay) : window.mainModules.getDelayToBeCalledToday(element.eventDate, element.eventTime, auxiliaryEventDelay);
        }
      });
    };

    if (eventId === undefined) {
      getDelayForAllEvent()
    } else {
      getDelayForOneEvent()
    }

    window.mainModules.eventsArray.push({
      auxiliaryEventFunction,
      auxiliaryEventName,
      eventId,
      eventTimeout,
      auxiliaryEventDelay
    });
  
    return console.table({auxiliaryEventFunction, auxiliaryEventName, eventId, eventTimeout, auxiliaryEventDelay});
  };

  window.mainModules.createAuxiliaryEvent = createAuxiliaryEvent;
})();
