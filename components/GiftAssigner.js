class GiftAssigner {
    constructor() {
        this.presents = [];
        this.persons = [];
    }

    addPresent(present) {
        this.presents.push(present);
    }

    addPerson(person) {
        this.persons.push(person);
    }

    assignGift(personKey, presentKey) {
        const person = this.persons.find((p) => p.key === personKey);
        const present = this.presents.find((p) => p.key === presentKey);

        if (!person || !present) {
            throw new Error("Invalid person or present key provided.");
        }

        person.giftList = present;
        present.status = 'Assigned';
    }
}

export default GiftAssigner;
