# event-calendar

This launch for modules.
1) create-event
2) create-recurring-event
3) auxiliary-event
4) utils

1) Module create-event is needed so that the user can create events for a specific dates and times, edit and delete creating events. as well as displaying a list of events. This module uses utils to calculate the time before the event start.

For create event, you need running function window.mainModules.createEvent(date, time, eventFunction, eventName).

date - this is the date, on which the event occurred;
time - this is the time, on which the event occurred;
eventFunction - this is the function, that called when an event occures;
eventName - this is name of the event.

For edit event, you need running function window.mainModules.editEvent(currentId, newEventName, newEventDate, newEventTime).

currentId - id of the event that the needed edit;
newEventName - new event name;
newEventDate - new event date;
newEventTime - new event time.

You can edit only "Once" events.

For delete event, you need running function window.mainModules.deleteEvent(currentId).

currentId - id of the event that the needed delete.

For showing list events, you need running function window.mainModules.showListEventsFromRange(range, date, interval).

range - this is the range for displaying the list ("Day", "Week", "Month", "Specified interval");
date - date from which to display the list;
interval - this is the interval for displaying the list. This parameter is optional. You should writing it, when range = "Specified interval".

2) Module create-recurring-event is needed so that the user can create recurring event. 

For create event, you need running function window.mainModules.createEvent(date, time, eventFunction, eventName, eventType, weekDays).

date - this is the date, on which the event occurred;
time - this is the time, on which the event occurred;
eventFunction - this is the function, that called when an event occures;
eventName - this is name of the event.
eventType - this is the type of the event (Once, Every Day, By selected days)
weekDays - this is the days when an event should occur (["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]). This parameter is optional. You should writing it, when selected "By selected days" type event.

This module haves three three use cases:

1. "Once" - creating of a single event;
2. "Every day" - creating daily events;
3. "By selected days" - creating events that occur on specific days.

3) Module auxiliary-event is needed so that the user can create auxiliary event. For example, to create a reminder before an event occurs.

For create auxiliary event, you need running function window.mainModules.createAuxiliaryEvent(delayType, numberDelay, auxiliaryEventFunction, auxiliaryEventName, eventId).

delayType - this is type of the delay ("second", "minute", "hour", "day", "thirty days");
numberDelay - this is the number of delay units;
auxiliaryEventFunction - this is the function, that called when an event occures;
auxiliaryEventName - this is name of the event;
eventId - id of the event that the auxiliary event is being created for (This parameter is optional. You should writing it, when you want creating auxiliary event for all events).

This module haves three two use cases:

1. for the one event;
2. for the all events (you should enter eventId).

4) Module utils is needed so that work rest modules. User doesn't use it directly in any way. Inside it calculate delay. Inside functions get two parameters - date and time.

To launch this app, you need to launch index.html. Press keyword f12 and call this functions.