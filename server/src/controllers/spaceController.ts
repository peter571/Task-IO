import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendInviteMail } from "@utils/sendInviteMail";
import { Space } from "@models/spaceModel";
import { RequestWithUserInfo } from "src/express";

export const createSpace = async (req: Request, res: Response) => {
  const newSpace = new Space(req.body);

  try {
    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ message: "Failed to save Space" });
  }
};

export const getUserSpaces = async (req: RequestWithUserInfo, res: Response) => {
  const { userId } = req.params;
  const requestedUserId = req.userId;

  try {
    if (requestedUserId !== userId)
      return res.status(403).json({ message: "Unauthorised" });
    const userSpaces = await Space.find({ members: userId }, { __v: 0 });
    res.status(200).json(userSpaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to get Spaces" });
  }
};

export const getSpaceById = async (req: Request, res: Response) => {
  const { workspace_id } = req.params;

  try {
    const space = await Space.findOne({ _id: workspace_id }, { __v: 0 });
    if (!space) return res.status(404).json();
    res.status(200).json(space);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const inviteMember = async (req: Request, res: Response) => {
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

    await sendInviteMail(from, to, url_link, subject)
      .then(() => {
        res.status(200).json();
      })
      .catch(() => {
        res.status(403).json();
      });
  } catch (error) {
    res.status(500).json("An error occurred.");
  }
};

export const validateToken = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    return res.status(200).json(user);
  });
};

export const addMember = async (req: Request, res: Response) => {
  const { token, userId } = req.body;

  try {
    const decoded = jwt.verify(token, `${process.env.SECRET}`) as JwtPayload;

    const foundSpace = await Space.findOne({
      _id: decoded.workspace_id,
      members: { $in: [userId] },
    });

    if (foundSpace) {
      return res.status(200).json("Member already exists in the array");
    } else {
      await Space.updateOne(
        { _id: decoded.workspace_id },
        { $addToSet: { members: userId } }
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
};

export const getSpaceMembers = async (req: Request, res: Response) => {
  const { spaceId } = req.params;

  try {
    // Get members from space
    const space = await Space.findOne({ _id: spaceId }).populate("members", {
      __v: 0,
      password: 0,
    });
    if (!space) return res.status(403).json();

    res.status(200).json(space.members);
  } catch (error) {
    res.status(500).json({ message: "Failed to load Space Users" });
  }
};
