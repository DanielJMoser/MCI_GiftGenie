import { Person } from '../models/Person';
import { Image } from 'react-native';

import Ilona from '../assets/Ilona.jpg'
import Clemens from '../assets/Clemens.jpg'
import Tobias from '../assets/Tobias.png'
import Nicolas from '../assets/Nicolas.jpg'
import Samuel from '../assets/Samuel.png'
import Daniel from '../assets/Daniel.jpg'

const IlonaUri = Image.resolveAssetSource(Ilona).uri
const ClemensUri = Image.resolveAssetSource(Clemens).uri
const TobiasUri = Image.resolveAssetSource(Tobias).uri
const NicolasUri = Image.resolveAssetSource(Nicolas).uri
const SamuelUri = Image.resolveAssetSource(Samuel).uri
const DanielUri = Image.resolveAssetSource(Daniel).uri

const persons = [
    {
        name: 'Ilona',
        birthday: '1992-07-07',
        category: 'family',
        image: IlonaUri
    },
    {
        name: 'Clemens',
        birthday: '2002-05-07',
        category: 'friends',
        image: ClemensUri
    },
    {
        name: 'Tobias',
        birthday: '1995-05-05',
        category: 'friends',
        image: TobiasUri
    },
    {
        name: 'Nicolas',
        birthday: '2000-07-22',
        category: 'friends',
        image: NicolasUri
    },
    {
        name: 'Samuel',
        birthday: '1994-01-26',
        category: 'friends',
        image: SamuelUri
    },
    {   
        name: 'Daniel',
        birthday: '2002-04-15',
        category: 'friends',
        image: DanielUri
    },
];

export const PERSONS = persons.map( (person) => new Person(person.name, person.birthday, person.category, person.image));