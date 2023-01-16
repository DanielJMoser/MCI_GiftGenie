import 'react-native-get-random-values';
import { v4 as generateUniqueKey } from 'uuid';

export class PersonCategory {
    constructor(description, key) {
        if (!key) {
            this._key = generateUniqueKey();
        } else {
            this._key = key;
        }
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get key() {
        return this._key;
    }
}
