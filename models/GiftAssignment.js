import { v4 as generateUniqueKey } from "uuid";

export class GiftAssignment {
  constructor(gift, person, event, key) {
    if (!key) {
      this._key = generateUniqueKey();
    } else {
      this._key = key;
    }
    this._gift = gift;
    this._person = person;
    this._event = event;
  }
}

GiftAssignment.fromObj = (obj) => {
  return new GiftAssignment(obj._gift, obj._person, obj._event);
};
