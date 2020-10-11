"use strict";

(() => {
  const NUMBER_MILISECONDS_IN_DAY = 86400000;
  const MAX_DELAY_IN_SET_TIMEOUT = 2147483647;

  /**
   * @description this function is needed for calculate delay before event
   * @param {string} date this is date when event occurs
   * @param {string} time this is time when event occurs
   * @returns {number} return delay before event
   */

  const getDelay = (date, time) => {
    const currentDate = new Date();
    const eventDate = new Date(`${date}T${time}`);

    return eventDate.getTime() - currentDate.getTime();
  };

  /**
  * @description this function is needed for getting day end
  * @returns {number} return delay before day end
  */

  const calculateTimeUntilDay = () => {
    const currentDate = new Date();
    const nextDay = new Date().setDate(new Date().getDate() + 1);
    const dayEnd = new Date(nextDay).setHours(0, 0, 0, 0);

    return dayEnd - currentDate.getTime();
  };

  /**
   * @description this function is needed for calculate delay before event if delay > 24 days
   * @param {date} date this is date when event occurs
   * @param {time} time this is time when event occurs
   * @returns {Function} return timeout
   */

  const getDelayToBeCalledToday = (date, time, auxiliaryEventDelay) => {
    /**
     * @description this function is needed for getting event day and time
     * @returns {Function} return function which will called
     */

    const getDayInWhichOccurEvent = () => {
      return setInterval(() => {
        const stringCurrentDate = new Date().toLocaleDateString().split(".").reverse().join("-");

        if (stringCurrentDate === date) {
          return setTimeout(eventFunction, getDelay(date, time) - auxiliaryEventDelay || 0);
        }
      }, NUMBER_MILISECONDS_IN_DAY);
    };

    return setTimeout(getDayInWhichOccurEvent, calculateTimeUntilDay());
  };

  window.mainModules.utils = {
    getDelay,
    getDelayToBeCalledToday,
    calculateTimeUntilDay,
    MAX_DELAY_IN_SET_TIMEOUT
  };
})();