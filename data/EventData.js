import { Event } from "../models/Event.js";
import { PERSONS } from "./PersonData.js";

const events = [
  {
    name: "Christmas",
    date: "2023-12-24",
    category: "family",
    personlist: [PERSONS[0], PERSONS[1], PERSONS[2], PERSONS[3]],
    giftlist: [],
    budget: 100,
  },
  {
    name: "Valentines Day",
    date: "2023-02-14",
    category: "friends",
    personlist: [PERSONS[6]],
    giftlist: [],
    budget: 100,
  },
  {
    name: "Birthday",
    date: "2023-01-26",
    category: "family",
    personlist: [PERSONS[0], PERSONS[1], PERSONS[2], PERSONS[3]],
    giftlist: [],
    budget: 75,
  },
];

export const EVENTS = events.map(
  (event, index) =>
    new Event(
      event.name,
      event.date,
      event.category,
      event.personlist,
      event.giftlist,
      event.budget,
      index
    )
);
