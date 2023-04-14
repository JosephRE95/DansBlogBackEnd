import { Router } from 'express';
import { searchPost } from '../controllers/postController';
// Documentation on search engine https://sequelize.org/api/v7/classes/_sequelize_core.model#findAll
const router = Router();
router.get('/:query', searchPost )
export default router;