import { v4 as generateUniqueKey } from "uuid";

export class Event {
  constructor(name, date, category, personlist, giftlist, budget, key) {
    if (!key) {
      this._key = generateUniqueKey();
    } else {
      this._key = key;
    }
    this._name = name;
    this._date = date;
    this._category = category;
    this._giftList = giftlist;
    this._personList = personlist;
    this._budget = budget;
  }
}
Event.fromObj = (obj) => {
  return new Event(
    obj._name,
    obj._date,
    obj._category,
    obj._personList,
    obj._giftList,
    obj._budget,
    obj._key
  );
};
