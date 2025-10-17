import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import animalService from "../services/animalService.js";
import getErrorMessage from "../utils/errorUtils.js";
import Animal from "../models/Animal.js";

const animalController = Router();

animalController.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
})

animalController.post('/create', isAuth, async(req, res) => {
    const animalData = req.body;
    const creatorId = req.user.id;

    try {
        await animalService.createAnimal(animalData, creatorId);
        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render('animals/create', {error: errorMessage, data: animalData});
    }
})

animalController.get('/:animalId/details', async(req, res) => {
    try {
        const animalId = req.params.animalId;
        const animal = await animalService.getOneAnimal(animalId);
        const isCreator = animal.ownerId && animal.ownerId.equals(req.user?.id);

        res.render('animals/details', {animal, isCreator});
    } catch (error) {
        const errorMessage = "This post doesn't exist";
        res.status(404).render('404', {error: errorMessage});
    }
})

animalController.get('/search', async (req, res) => {
    const filter = req.query;
    const animals = await animalService.getAllAnimals(filter);

    res.render('search', {animals, filter});
})

export default animalController;