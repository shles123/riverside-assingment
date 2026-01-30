import express from 'express'
import { getRiskSessions } from '../services/riskService.js'
const router = express.Router()

router.get('/sessions', (req, res, next) => {
    try {
        const data = getRiskSessions();
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
})

export default router