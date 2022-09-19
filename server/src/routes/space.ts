import express from "express";
import authenticateToken from "../middleware/auth";
import { Space } from "../models/spaceModel";

const router = express.Router();

//Create Space
router.post("/", authenticateToken, async (req, res) => {
  const newSpace = new Space(req.body);

  try {
    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(409).json({ message: "Failed to save Space" });
  }
});

//Get user spaces
router.get("/:spaceId", authenticateToken, async (req, res) => {
  const { id } = req.params;
  
   try {
    await Space.findOne({ id });  
   } catch (error) {
    res.status(409).json({ message: `Failed to get Space with ${id}` });
   } 
});

export default router;
