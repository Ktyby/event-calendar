"use strict";

(() => {
  const NUMBER_MILISECONDS_IN_DAY = 86400000;
  const MAX_DELAY_IN_SET_TIMEOUT = 2147483647;

  /**
   * 
   * @param {string} date this is date when event occurs
   * @param {string} time this is time when event occurs
   * @description this function is needed for calculate delay before event
   * @returns {number} return delay before event
   */

  const getDelay = (date, time) => {
    const currentDate = new Date();
    const eventDate = new Date(`${date}T${time}`);

    return eventDate.getTime() - currentDate.getTime();
  };

  /**
   * 
   * @param {date} date this is date when event occurs
   * @param {time} time this is time when event occurs
   * @description this function is needed for calculate delay before event if delay > 24 days
   */

  const getDelayToBeCalledToday = (date, time) => {
    const currentDate = new Date();

    /**
     * @description this function is needed for getting day end
     */

    const calculateTimeUntilDay = () => {
      const dayEnd = new Date().setHours(23, 59, 59, 999);

      return dayEnd - currentDate.getTime();
    };

    /**
     * @description this function is needed for getting event day and time
     */

    const getDayInWhichOccurEvent = () => {
      return setInterval(() => {
        const stringCurrentDate = new Date().toLocaleDateString().split(".").reverse().join("-");

        if (stringCurrentDate === date) {
          return setTimeout(eventFunction, getDelay(date, time));
        }
      }, NUMBER_MILISECONDS_IN_DAY);
    };

    return setTimeout(getDayInWhichOccurEvent, calculateTimeUntilDay());
  };

  window.mainModules.utils = {
    getDelay,
    getDelayToBeCalledToday,
    MAX_DELAY_IN_SET_TIMEOUT
  };
})();