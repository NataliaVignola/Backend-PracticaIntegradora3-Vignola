import { Router } from "express";
import {signinController, signupController, logoutController} from '../controllers/userController'
import passport from "passport";

const router = Router()


router.post('/signup', passport.authenticate('signup'), signupController)

router.get('/signin', passport.authenticate('signin'), signinController)

router.get('/logout', logoutController)

// PI3- nueva ruta para cambiar el rol del usuario
router.post('/premium/:uid', changeUserRoleController);

export default router