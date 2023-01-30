export class Contact {
    constructor(name, birthday, image) {
        this._name = name;

        const tempBirthday = new Date(birthday);
        if (!birthday || tempBirthday.toString() === 'Invalid Date') {
            this._birthday = null;
        } else {
            this._birthday = tempBirthday;
        }

        this._image = image;
    }

    get name() {
        return this._name;
    }

    get birthday() {
        return this._birthday;
    }

    get image() {
        return this._image;
    }
}

Contact.fromJson = (json) => {
    const obj = JSON.parse (json);
    return new Contact (obj._name, obj._birthday, obj._image);
};

Contact.fromObj = (obj) => {
    return new Contact (obj._name, obj._birthday, obj._image);
};

