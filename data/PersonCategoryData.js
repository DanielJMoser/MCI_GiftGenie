import {PersonCategory} from "../models/PersonCategory";

const personCategory = [
    {
        description: 'friends',
    },
    {
        description: 'family',
    },
    {
        description: 'partner',
    },
    {
        description: 'best friends',
    },
    {
        description: 'general',
    },
];

export const PERSONCATEGORIES = personCategory.map( (category) => new PersonCategory(category.description));

export const DEFAULTPERSONCATEGORY = personCategory.find((element) => element.description === 'general');