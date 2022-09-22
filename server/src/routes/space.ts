import express from "express";
import authenticateToken from "../middleware/auth";
import { User } from "../models/authModel";
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

//Get spaces for a specific user
router.get("/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const userSpaces = await Space.find({ members: userId });
    res.status(201).json(userSpaces);
  } catch (error) {
    res.status(409).json({ message: `Failed to get Spaces` });
  }
});

//Add new Member to Space
router.patch("/:spaceId", authenticateToken, async (req, res) => {
  const { spaceId, userId } = req.params;

  try {
    const existingSpace = await Space.find({ spaceId });
    if (!existingSpace)
      return res.status(400).json({ message: "Space does not exist!" });

    await Space.updateOne({ _id: spaceId }, { $push: { members: userId } });
    const updatedSpace = await Space.findOne({ _id: spaceId });
    res.status(201).json(updatedSpace);
  } catch (error) {
    res.status(409).json({ message: `Failed to update Space` });
  }
});

// Get all users of a Space
router.get("/:spaceId", authenticateToken, async (req, res) => {
  const { spaceId } = req.params;

  try {
    // Get members from space
    const space = await Space.findOne({ _id: spaceId });
    const spaceMembers = space?.members;
    const formatedMembers = spaceMembers?.map(async (user) => {
      return await User.findOne({ _id: user });
    });

    res.status(201).json(Promise.all<any>(formatedMembers));

  } catch (error) {
    res.status(409).json({ message: `Failed to load Space Users` });
  }
});

export default router;
