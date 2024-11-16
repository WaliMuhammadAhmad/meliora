const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middlewares/uploadAdminImage');

router.post('/', upload.single('image'), adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', upload.single('image'), adminController.updateAdmin);
router.put('/role/:id', adminController.updateAdminRole);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;