import { Router } from "express";
import homeController from "./controllers/homeController.js";
import animalController from "./controllers/animalController.js";
import authController from "./controllers/authController.js";

const router = Router();

router.use(homeController);
router.use('/animals', animalController);
router.use('/auth', authController);

router.get('/*splat', (req, res) => {
    res.render('404');
})


export default router;