import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";

const animalController = Router();

animalController.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
})

export default animalController;