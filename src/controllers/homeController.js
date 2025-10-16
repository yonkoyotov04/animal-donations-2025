import { Router } from "express";

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home');
})


homeController.get('/search', (req, res) => {
    res.render('search');
})

homeController.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

export default homeController;