import express from 'express'
import authenticateToken from '../middleware/auth';
import { Space } from '../models/spaceModel';

const router = express.Router();

//Create Space
router.post('/', authenticateToken, async (req, res) => {
    const newSpace = new Space(req.body);

    try {
        await newSpace.save();
        res.status(201).json(newSpace);
    } catch (error) {
        res.status(409).json({ message: "Failed to save Space" });
    }
})

export default router;
