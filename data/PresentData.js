import { Present } from "../models/Present";

const presents = [
  {
    name: "Bike",
    price: 100,
    category: "family",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/15-07-12-Ciclistas-en-Mexico-RalfR-N3S_8973.jpg/330px-15-07-12-Ciclistas-en-Mexico-RalfR-N3S_8973.jpg",
    storename: "Walmart",
    link: "https://www.walmart.com/",
    barcode: "123456789",
    status: "pending",
    key: "1",
  },
  {
    name: "Car",
    price: 1000,
    category: "friends",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/31/Ford_T_Jon_Sullivan.jpg",
    storename: "Target",
    link: "https://www.target.com/",
    barcode: "123456789",
    status: "gifted",
    key: "2",
  },
  {
    name: "Ski",
    price: 109.9,
    category: "family",
    image:
      "https://intersport-de.imgdn.net/fsi/server?type=image&source=intersport/Produktiv/color/006/4036332/905/F/W2_4036332_905_F1_006_TECNOPRO.png&effects=Pad(cc,ffffff),Matte(FFFFFF)&width=1400&height=1400",
    storename: "InterSport",
    link: "https://www.intersport.de/ausruestung/ski-ausruestung/all-mountain-ski/170988/tecnopro-kinder-skiset-xt-team/",
    barcode: "123456789",
    status: "Idee",
    key: "",
  },
];

export const PRESENTS = presents.map(
  (present) =>
    new Present(
      present.name,
      present.price,
      present.category,
      present.image,
      present.storename,
      present.link,
      present.barcode,
      present.status,
      present.key
    )
);
