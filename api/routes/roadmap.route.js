import express from 'express'
import { deleteRoadmap, getRoadmap } from '../controllers/roadmap.controller.js'
import protect from '../middleware/auth.middleware.js'


const router = express.Router()

router.get('/:goalId', protect, getRoadmap)
router.delete('/:goalId', protect, deleteRoadmap)


export default router;
