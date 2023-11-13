import express from 'express';
import passport from 'passport';
const router = express.Router();

// Ruta para el registro de usuarios
router.post('/register', passport.authenticate('signup', {
    successRedirect: '/auth/login',
    failureRedirect: '/auth/register',
    failureFlash: true
}));

// Ruta para iniciar sesión
router.post('/login', passport.authenticate('signin', {
    successRedirect: '/', // Redirige a la página principal o a donde desees
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // Redirige a la página principal o a donde desees
});

// Ruta para obtener el usuario actual
router.get('/user', (req, res) => {
    res.json({ user: req.user });
});

export default router;
