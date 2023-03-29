import { Router } from 'express';
import { createUser, getUser, loginUser, getAllUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);
router.get('/', getAllUser);

router.delete('/:userId', deleteUser);


export default router;