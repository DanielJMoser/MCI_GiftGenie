import { createContext, useEffect, useState } from "react";

import { Event } from "../models/Event";
import { EVENTS } from "../data/EventData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const eventsStorageKey = "events";

export const EventsContext = createContext({
  events: [],
  addEvent: (event) => {},
  updateEvent: (event) => {},
  removeEvent: (event) => {},
});

function EventsContextProvider({ children }) {
  const [events, setEvents] = useState([]);

  function addEvent(event) {
    setEvents((currentEvents) => [...currentEvents, event]);
  }
  function updateEvent(event) {
    setEvents((currentEvents) => {
      const newArray = [...currentEvents];
      const updateIndex = newArray.findIndex(
        (element) => element._key === event._key
      );
      newArray[updateIndex].setAttributes(
        event._name,
        event._date,
        event._time,
        event._location,
        event._description,
        event._image
      );
      return newArray;
    });
  }
  function removeEvent(event) {
    setEvents((currentEvents) =>
      currentEvents.filter((currentEvent) => currentEvent._key !== event._key)
    );
  }

  useEffect(() => {
    if (events.length > 0) {
      AsyncStorage.setItem(eventsStorageKey, JSON.stringify(events)).then(
        () => {}
      );
    } else {
      setEvents(EVENTS); // TODO: restore test data during testing only
      console.log("setting dummy data");
    }
  }, [events]);

  useEffect(() => {
    AsyncStorage.getItem(eventsStorageKey).then((value) => {
      if (value) {
        const valueParsed = JSON.parse(value);
        const savedEvents = valueParsed.map((element) => {
          return Event.fromObj(element);
        });
        setEvents(savedEvents);
      }
    });
  }, []);

  const value = {
    events: events,
    addEvent: addEvent,
    updateEvent: updateEvent,
    removeEvent: removeEvent,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export default EventsContextProvider;
