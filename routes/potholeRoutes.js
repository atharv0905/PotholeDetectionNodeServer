const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const potholeController = require('../controllers/potholeController');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------------------------------------------------------------------------------------------------
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // save uploaded files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // generate a unique filename
    }
});

const upload = multer({ storage: storage });

// Multer configuration
// ----------------------------------------------------------------------------------------------------------------------------------



// Route for adding new pothole
router.post('/add', upload.single('photo'), potholeController.addNewPothole);   // tested

// ----------------------------------------------------------------------------------------------------------------------------------
// get all pothole data
router.get("/getAllPothole", potholeController.getAllPotholeData)              // tested

router.get("/getLatLngOfAllPothole", potholeController.getLatLngOfAllPothole)    // tested

router.get("/getImageOfSpecificPothole/:id", potholeController.getImageOfSpecificPothole)   // tested
// get all pothole data
// ----------------------------------------------------------------------------------------------------------------------------------

router.delete('/:id', potholeController.deletePotholeById);                            // tested

router.post('/fix', potholeController.markPotholeAsFixed);                      // tested

module.exports = router;