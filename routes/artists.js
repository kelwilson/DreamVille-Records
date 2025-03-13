const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const artistsController = require("../controllers/artists");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, artistsController.getArtist);

// router.get("/favorite", ensureAuth, artistsController.getFavoriteArtist);

router.post("/createArtist", artistsController.createArtist);

router.put("/favoriteArtist/:id", artistsController.favoriteArtist);

router.delete("/deleteArtist/:id",  artistsController.deleteArtist);

module.exports = router;