import express from "express";
import authenticateToken from "../middleware/auth";
import { User } from "../models/authModel";
import { Space } from "../models/spaceModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendMail } from "../utils/sendMail";
import { error } from "console";

const router = express.Router();

//Create Space
router.post("/new-space", authenticateToken, async (req, res) => {
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
  const { user_email } = req.query;

  try {
    const userSpaces = await Space.find({ members: user_email }, { __v: 0 });
    res.status(200).json(userSpaces);
  } catch (error) {
    res.status(500).json({ message: `Failed to get Spaces` });
  }
});

// Invite member to space
router.post("/invite-member", authenticateToken, async (req, res) => {
  const { admin_id, user_email, workspace_id } = req.body;
  try {
    const workspace = await Space.findOne({ _id: workspace_id });
    //Check it's only the admin sending the Invite
    if (workspace?.admin.toString() !== admin_id)
      return res.status(403).json("Unauthorised");

    const token = jwt.sign(
      { workspace_id, user_email, admin_id },
      `${process.env.SECRET}`,
      { expiresIn: "1d" }
    );

    const from = "peterkoech1624@gmail.com";
    const to = user_email;
    const subject = "Invite to join " + workspace?.name;
    const url_link = "http://localhost:5173/invite?token=" + token;

    await sendMail(from, to, url_link, subject)
      .then(() => {
        res.status(200).json();
      })
      .catch(() => {
        res.status(403).json();
      });
  } catch (error) {
    res.status(500).json("An error occured.");
  }
});

//Add new Member to Space
router.patch("/validate/add-member", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET}`) as JwtPayload;

    const foundSpace = await Space.findOne({
      members: { $in: [decoded.user_email] },
    });

    if (foundSpace) {
      console.log("Email already exists in the array");
      return res.status(200).json("Email already exists in the array");
    } else {
      console.log("Email does not exist in the array");
      await Space.updateOne(
        { _id: decoded.workspace_id },
        { $push: { members: decoded.user_email } }
      );

      const workspace = await Space.findOne(
        { _id: decoded.workspace_id },
        { __v: 0 }
      );
      return res.status(201).json(workspace);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("An error occurred.");
  }
});

// Get all users of a Space
router.get(
  "/get-space-members/:spaceId",
  authenticateToken,
  async (req, res) => {
    const { spaceId } = req.params;

    try {
      // Get members from space
      const space = await Space.findOne({ _id: spaceId }, { __v: 0 });
      const spaceMembers = space?.members;
      res.status(200).json(spaceMembers);
    } catch (error) {
      res.status(500).json({ message: `Failed to load Space Users` });
    }
  }
);

export default router;
