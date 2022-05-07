const express = require('express');
const router = express.Router();
const linksController = require('../controllers/sites')
const multer  = require('multer')


//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/icons");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
})


router.get("/all", linksController.fetchAllSites)
router.post("/new", upload.single('icon'), linksController.newSite)
router.post("/remove", linksController.removeSite)
// router.post("/", linksController.fetchAllLinks)
module.exports = router;
