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
    res.status(500).json({ message: "Failed to save Space" });
  }
});

//Get spaces for a specific user
router.get("/get-user-spaces/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const userSpaces = await Space.find({ "members.userId": userId });
    res.status(200).json(userSpaces);
  } catch (error) {
    res.status(500).json({ message: `Failed to get Spaces` });
  }
});

//Add new Member to Space
router.patch("/space/:spaceId/add-member", authenticateToken, async (req, res) => {
  const { spaceId } = req.params;
  const { userId } = req.body;

  try {
    const existingSpace = await Space.find({ _id: spaceId });
    if (!existingSpace)
      return res.status(400).json({ message: "Space does not exist!" });

    //Add user to members field 
    const user = await User.findOne({ _id: userId });
    const formatedUser = {
      userId,
      email: user?.email,
      avatar: user?.avatar,
      name: user?.name,
    };

    await Space.updateOne({ _id: spaceId }, { $push: { members: formatedUser } });
    const updatedSpace = await Space.findOne({ _id: spaceId });
    res.status(201).json(updatedSpace);
  } catch (error) {
    res.status(500).json({ message: `Failed to update Space` });
  }
});

// Get all users of a Space
router.get("/get-space-members/:spaceId", authenticateToken, async (req, res) => {
  const { spaceId } = req.params;

  try {
    // Get members from space
    const space = await Space.findOne({ _id: spaceId });
    const spaceMembers = space?.members;
    res.status(200).json(spaceMembers);

  } catch (error) {
    res.status(500).json({ message: `Failed to load Space Users` });
  }
});

export default router;
