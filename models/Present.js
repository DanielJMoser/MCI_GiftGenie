import { v4 as generateUniqueKey } from 'uuid';


export class Present {

    constructor(name, price, category, image, storename, link, barcode, status, key) {
        if (!key) {
            this._key = generateUniqueKey();
        } else {
            this._key = key;
        }

        if (!barcode) {
            this.barcode = null;
        } else {
            this.barcode = barcode;
        }

        if (!status) {
            this.status = null;
        } else {
            this.status = status;
        }
            

        this._name = name;
        this._price = price;
        this._category = category;
        this._image = image;
        this._store = storename;
        this._link = link;
        this._barcode = barcode;
        this._status = status;
    
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get store() {
        return this._store;
    }

    set store(value) {
        this._store = value;
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

    get link() {
        return this._link;
    }

    set link(value) {
        this._link = value;
    }

    get barcode() {
        return this._barcode;
    }

    set barcode(value) {
        this._barcode = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get key() {
        return this._key;
    }
}

