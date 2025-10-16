import { Router } from "express";
import authService from "../services/authService.js";
import getErrorMessage from "../utils/errorUtils.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
})

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        let errorMessage = getErrorMessage(error);
        res.status(400).render('auth/register', {error: errorMessage, email: userData.email});
    }
})

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
})

authController.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        res.status(400).render('auth/login', {error: errorMessage, email})
    }
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;