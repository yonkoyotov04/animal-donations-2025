import Animal from "../models/Animal.js";

export default {
    getAllAnimals(filter = {}) {
        let query = Animal.find()

        if (filter.location) {
            query = query.find({location: {$regex: filter.location, $options: 'i'}});
        }

        return query;
    },

    getOneAnimal(animalId) {
        return Animal.findById(animalId);
    },

    getLastThree() {
        return Animal.find().sort({$natural: -1}).limit(3);
    },

    createAnimal(animalData, creatorId) {
        return Animal.create({
            ...animalData,
            ownerId: creatorId
        })
    }
}