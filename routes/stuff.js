import express from 'express';
import stuffCtrl from '../controllers/stuff.js';
import auth  from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
export default router;