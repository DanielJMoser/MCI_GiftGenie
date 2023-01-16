import { Geschenk } from "../models/Geschenk";

const geschenke = [
    {
        name: 'Ski',
        price: 109.90,
        store: 'InterSport',
        link: 'https://www.intersport.de/ausruestung/ski-ausruestung/all-mountain-ski/170988/tecnopro-kinder-skiset-xt-team/',
        image: 'https://intersport-de.imgdn.net/fsi/server?type=image&source=intersport/Produktiv/color/006/4036332/905/F/W2_4036332_905_F1_006_TECNOPRO.png&effects=Pad(cc,ffffff),Matte(FFFFFF)&width=1400&height=1400',
        barcode: '123456789',
        status: 'Idee'
    },
    
    {
        name: 'Bike',
        price: 100,
        store: 'WalMart',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/15-07-12-Ciclistas-en-Mexico-RalfR-N3S_8973.jpg/330px-15-07-12-Ciclistas-en-Mexico-RalfR-N3S_8973.jpg',
        link: 'https://www.walmart.com/',
        barcode: '',
        status: 'pending',
    },
    {
        name: 'Car',
        price: 1000,
        store: 'target',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Ford_T_Jon_Sullivan.jpg',
        link: 'https://www.target.com/',
        barcode: '',
        status: 'gifted',
    }
];

export const GESCHENKE = geschenke.map(
    (geschenk) =>
        new Geschenk(
            geschenk.name,
            geschenk.price,
            geschenk.store,
            geschenk.link,
            geschenk.image,
            geschenk.barcode,
            geschenk.status
        )
);