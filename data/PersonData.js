import { Person } from '../models/Person';

const persons = [
    {
        name: 'Alex VdB',
        birthday: '1944-01-18',
        category: 'family',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bundespr%C3%A4sident_Alexander_Van_der_Bellen.jpg/255px-Bundespr%C3%A4sident_Alexander_Van_der_Bellen.jpg'
    },
    {
        name: 'Wolfgang Amadeus Mozart',
        birthday: '1956-01-27',
        category: 'friends',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Croce-Mozart-Detail.jpg/330px-Croce-Mozart-Detail.jpg'
    },
    {
        name: "Lari",
        birthday: '1992-07-10',
        category: 'best friends',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rise_Up%21_And_Dance_Premiere_Wien_02_Larissa_Marolt.jpg/1200px-Rise_Up%21_And_Dance_Premiere_Wien_02_Larissa_Marolt.jpg'
    },
    {
        name: 'Marcel',
        birthday: '1989-03-02',
        category: 'best friends',
        image: 'https://media.skigebiete-test.de/images/ecu/content/c_blogarticle/marcel-hirscher-beendet-karriere_n2414363-72685-1_l.jpg'
    },
    {
        name: 'David',
        birthday: '1992-06-24',
        category: 'friends',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg/250px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_David_Alaba_850_1632.jpg'
    },
    {
        name: 'Mary',
        birthday: '1977-05-13',
        category: 'friends',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Maria_Theresia_im_Spitzenbesetzten_Kleid.jpg/330px-Maria_Theresia_im_Spitzenbesetzten_Kleid.jpg'
    },
    {
        name: 'Niki Lauda',
        birthday: null,
        category: 'general',
        image: null
    }
];

export const PERSONS = persons.map( (person) => new Person(person.name, person.birthday, person.category, person.image));