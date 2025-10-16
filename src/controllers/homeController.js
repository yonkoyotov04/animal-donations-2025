import { Router } from "express";
import animalService from "../services/animalService.js";

const homeController = Router();

homeController.get('/', async (req, res) => {
    const animals = await animalService.getLastThree();
    res.render('home', { animals });
})


homeController.get('/search', (req, res) => {
    res.render('search');
})

homeController.get('/dashboard', async (req, res) => {
    const animals = await animalService.getAllAnimals();
    res.render('dashboard', { animals });
})

export default homeController;