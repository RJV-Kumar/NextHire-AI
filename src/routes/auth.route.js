const { Router } = require('express')
const authRouter = Router()
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware");
/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login a user, expects email and password in the req body
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist table
 */
authRouter.get('/logout', authController.logoutUserController)

/**
 * @route POST /api/auth/register
 * @description Register a new user
 */
authRouter.get("/getUser", authMiddleware.authUser, authController.getUserController)

module.exports = authRouter