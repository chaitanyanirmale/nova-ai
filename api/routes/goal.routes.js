import express from 'express'
import { createGoal, deleteGoal, getGoal, updateGoal } from '../controllers/goal.controller.js'
import protect from '../middleware/auth.middleware.js'


const router = express.Router()

router.post('/create-goal',protect, createGoal)
router.get('/get-goal',protect, getGoal)
router.put('/update-goal/:id',protect, updateGoal)
router.delete('/delete-goal/:id',protect, deleteGoal)

export default router