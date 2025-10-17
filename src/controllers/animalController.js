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

animalController.get('/:animalId/edit', isAuth, async(req, res) => {
    
    try {
        const animalId = req.params.animalId;
        const animal = await animalService.getOneAnimal(animalId);

        if (!animal.ownerId?.equals(req.user.id)) {
            res.status(401).render('404', {error: "Only the post's creator can edit it"});
        }

        res.render('animals/edit', { animal });
    } catch (error) {
        res.status(400).render('404', {error: "Animal not found"});
    }
})

animalController.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalId = req.params.animalId;
    const animal = req.body;

    try {
        await animalService.editAnimal(animalId, animal);
        res.redirect(`/animals/${animalId}/details`);
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render('animals/edit', {error: errorMessage, animal});
    }
})

animalController.get('/:animalId/delete', isAuth, async(req, res) => {
    try {
        const animalId = req.params.animalId;
        const animal = await animalService.getOneAnimal(animalId);

        console.log(!animal.ownerId?.equals(req.user.id));

        if (!animal.ownerId?.equals(req.user.id)) {
            res.render('404', {error: "Only the post's creator can delete it"});
        }

        await animalService.deleteAnimal(animalId);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).render('404', {error: "Animal not found!"});
    }
})

animalController.get('/search', async (req, res) => {
    const filter = req.query;
    const animals = await animalService.getAllAnimals(filter);

    res.render('search', {animals, filter});
})


export default animalController;