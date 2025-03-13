const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const artistsController = require("../controllers/artists");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, artistsController.getProfile);
router.get("/artist", artistsController.getAllArtist);
// router.get("/:id", artistsController.getArtistInfo);
router.get("/favorite", ensureAuth, artistsController.getFavoriteArtist)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;