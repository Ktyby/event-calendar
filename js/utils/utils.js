"use strict";

(() => {
  const NUMBER_MILISECONDS_IN_DAY = 86400000;
  const MAX_DELAY_IN_SET_TIMEOUT = 2147483647;
  const currentDate = new Date();

  const getDelay = (date, time) => {
    const eventDate = new Date(`${date}T${time}`);

    return eventDate.getTime() - currentDate.getTime();
  };

  const getDelayToBeCalledToday = (date, time) => {
    const calculateTimeUntilDay = () => {
      const dayEnd = new Date().setHours(23, 59, 59, 999);

      return dayEnd - currentDate.getTime();
    };

    const getDayInWhichOccurEvent = () => {
      return setInterval(() => {
        const currentDate = new Date().toLocaleDateString().split(".").reverse().join("-");

        if (currentDate === date) {
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