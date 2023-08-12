import express from "express";
import authenticateToken from "../middleware/auth";
import * as spaceController from "../controllers/spaceController";

const router = express.Router();

//Create Space
router.post("/new-space", authenticateToken, spaceController.createSpace);

//Get spaces for a specific user
router.get("/get-user-spaces/:userId", authenticateToken, spaceController.getUserSpaces);

//Get space by Id
router.get('/space/:workspace_id', authenticateToken, spaceController.getSpaceById);

// Invite member to space
router.post("/invite-member", authenticateToken, spaceController.inviteMember);

//Validate token
router.get("/validate-token", spaceController.validateToken);

//Add new Member to Space
router.patch("/validate/add-member", spaceController.addMember);

// Get all users of a Space
router.get("/get-space-members/:spaceId", authenticateToken, spaceController.getSpaceMembers);

export default router;
