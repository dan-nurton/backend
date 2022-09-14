// !!! Attention a l'ordre d'import !!!
// Routeur
import express from 'express';
const router = express.Router();
// Middlewares
import auth  from '../middleware/auth.js';
import multer   from '../middleware/multer-config.js';

//Controller
import {createThing, getOneThing, modifyThing, deleteThing, getAllStuff} from '../controllers/stuff.js';

router.get('/', 
    async (req, res) => {
        const result = await getAllStuff();
        if (result.data) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({
                error: result.error
            });
        }
    }
);

router.delete('/:id', auth,
    async (req, res) => {
        const {id} = req.params;
        const {userId} = req.auth;
        const result = await deleteThing(id, userId);
        if (result.data) {
            res.status(200).json(result.data);
        } else {
            res.status(400).json({
                error: result.error
            });
        }
    }
);

router.post('/', auth, multer, createThing);
router.get('/:id', auth, getOneThing);
router.put('/:id', auth, multer, modifyThing);

export default router;