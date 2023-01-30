import 'react-native-get-random-values';
import { v4 as generateUniqueKey } from 'uuid';

import {DEFAULTPERSONCATEGORY} from "../data/PersonCategoryData";

export class Person {
    constructor(name, birthday, category, image, interests, key) {
        if (!key) {
            this._key = generateUniqueKey();
        } else {
            this._key = key;
        }

        this._name = name;

        const tempBirthday = new Date(birthday);
        if (!birthday || tempBirthday.toString() === 'Invalid Date') {
            this._birthday = null;
        } else {
            this._birthday = tempBirthday;
        }
        if (!category) {
            this.category = DEFAULTPERSONCATEGORY.description;
        } else {
            this._category = category;
        }

        this._image = image;
        this._interests = interests;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(value) {
        this._birthday = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get key() {
        return this._key;
    }

    get giftList() {
        return this._giftList;
    }

    get eventList() {
        return this._eventList;
    }

    get interests() {
        return this._interests;
    }
    setAttributes (name, birthday, category, image, interests) {
        this._name = name;
        this._birthday = birthday;
        this._category = category;
        this._image = image;
        this._interests = interests;
    };
}

Person.fromJson = (json) => {
    const obj = JSON.parse (json);
    return new Person (obj._name, obj._birthday, obj._category, obj._image, obj._interests, obj._key);
};

Person.fromObj = (obj) => {
    return new Person (obj._name, obj._birthday, obj._category, obj._image, obj._interests, obj._key);
};

