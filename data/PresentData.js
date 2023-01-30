import { Image } from 'react-native';
import { Present } from "../models/Present";
import Merci from '../assets/merci.jpg'
import Roses from '../assets/roses.jpg'
import Bike from '../assets/bike.jpg'
import Pots from '../assets/pots.jpg'
import Ski from '../assets/ski.jpg'

const MerciUri = Image.resolveAssetSource(Merci).uri
const RosesUri = Image.resolveAssetSource(Roses).uri
const BikeUri = Image.resolveAssetSource(Bike).uri
const PotsUri = Image.resolveAssetSource(Pots).uri
const SkiUri = Image.resolveAssetSource(Ski).uri

const presents = [
  {
    name: "Bike",
    price: 299.99,
    category: "family",
    image: BikeUri,
    storename: "InterSport",
    link: "https://www.intersport.at/genesis-evolution-jr16-lite-lightweight-fahrrad-16-fahrrader-und-bikezubehor-orange-iat.genesis.4036815.132.html",
    barcode: "123456789",
    status: "Not Bought",
  },
  {
    name: "Ski",
    price: 89,
    category: "family",
    image: SkiUri,
    storename: "InterSport",
    link: "https://www.intersport.de/ausruestung/ski-ausruestung/all-mountain-ski/170988/tecnopro-kinder-skiset-xt-team/",
    barcode: "123456789",
    status: "Not Bought",
    key: "3",
  },
  {
    name: "Merci",
    price: 3.49,
    category: "family",
    image: MerciUri,
    link: "https://shop.billa.at/produkte/merci-grosse-vielfalt/00-5561",
    storename: "Billa",
    barcode: "123456789",
    status: "Not Bought",
  },
  {
    name: "Roses",
    price: 64.95,
    category: "partner",
    image: RosesUri,
    link: "https://www.fleursdeparis.at/rose-gold-collection.html",
    storename: "Fleurs de Paris",
    barcode: "123456789",
    status: "Not Bought",
  },
  {
    name: "Pottery",
    price: 17.14,
    category: "family",
    image: PotsUri,
    link: "https://www.amazon.de/EKKONG-Sukkulenten-Blumentopf-Untersetzer-Innenbereich/dp/B09MTB8STC",
    storename: "Amazon",
    barcode: "123456789",
    status: "Not Bought",
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
      null
    )
);
