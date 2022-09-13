// !!! Attention a l'ordre d'import !!!
// Routeur
import express from 'express';
const router = express.Router();
// Middlewares
import auth  from '../middleware/auth.js';
import multer   from '../middleware/multer-config.js';
//Controller
import stuffCtrl from '../controllers/stuff.js';

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

export default router;