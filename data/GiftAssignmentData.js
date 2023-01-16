import { GiftAssignment } from "../models/GiftAssignment";
import { PRESENTS } from "./PresentData";
import { PERSONS } from "./PersonData";
import { EVENTS } from "./EventData";

const GiftAssignmentData = [
  {
    event: EVENTS[0]._key,
    person: PERSONS[0]._key,
    gift: PRESENTS[0]._key,
  },
  {
    event: EVENTS[0]._key,
    person: PERSONS[0]._key,
    gift: PRESENTS[1]._key,
  },
  {
    event: EVENTS[0]._key,
    person: PERSONS[1]._key,
    gift: PRESENTS[1]._key,
  },
  {
    event: EVENTS[0]._key,
    person: PERSONS[2]._key,
    gift: PRESENTS[1]._key,
  },
];

export const GIFTASSIGNMENTS = GiftAssignmentData.map(
  (event) => new GiftAssignment(event.gift, event.person, event.event)
);
