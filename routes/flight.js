import express from 'express';
import {getUserData, addFlightInfo} from '../dataManager/flightData.js'


const router = express.Router();

// Get user data
router.get('/', getUserData);

// Add flight data
router.post('/', addFlightInfo)


export default router;