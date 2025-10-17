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
    },

    async donate(animalId, userId) {
        const animal = await Animal.findById(animalId);

        if (animal.donations.includes(userId)) {
            throw new Error("You've already donated!");
        }

        if (animal.ownerId?.equals(userId)) {
            throw new Error("The creator can't donate to his own animal");
        }
        return Animal.findByIdAndUpdate(animalId, {$push: {donations: userId}})
    },

    editAnimal(animalId, animalData) {
        return Animal.findByIdAndUpdate(animalId, animalData, {runValidators: true});
    },

    deleteAnimal(animalId) {
        return Animal.findByIdAndDelete(animalId);
    }
}