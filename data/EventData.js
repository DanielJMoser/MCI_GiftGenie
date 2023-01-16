import { Event } from "../models/Event.js";
import { PERSONS } from "./PersonData.js";

const events = [
  {
    name: "Christmas",
    date: "2020-12-24",
    category: "family",
    personlist: [PERSONS[0], PERSONS[1], PERSONS[2], PERSONS[3]],
    giftlist: [],
    budget: 100,
  },
  {
    name: "Valentines Day",
    date: "2021-02-14",
    category: "friends",
    personlist: [PERSONS[6]],
    giftlist: [],
    budget: 30,
  },
  {
    name: "Birthday",
    date: "2021-03-14",
    category: "family",
    personlist: [PERSONS[0], PERSONS[1], PERSONS[2], PERSONS[3]],
    giftlist: [],
    budget: 50,
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
