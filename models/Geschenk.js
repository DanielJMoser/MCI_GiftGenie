import { v4 } from "uuid";

export class Geschenk {
    constructor(name, price, store, link, image, barcode, status, key) {
        if (!key) {
            this._key = v4();
        } else {
            this._key = key;
        }
        this._name = name;
        this._price = price;
        this._store = store;
        this._link = link;
        this._image = image;
        this._barcode = barcode;
        this._status = status;
    }
}