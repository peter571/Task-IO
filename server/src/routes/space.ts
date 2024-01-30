import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import * as spaceController from "../controllers/spaceController";

const router = express.Router();

//Create Space
router.post("/new-space", verifyJWT, spaceController.createSpace);

//Get spaces for a specific user
router.get("/get-user-spaces/:userId", verifyJWT, spaceController.getUserSpaces);

//Get space by Id
router.get('/space/:workspace_id', verifyJWT, spaceController.getSpaceById);

// Invite member to space
router.post("/invite-member", verifyJWT, spaceController.inviteMember);

//Validate token
router.get("/validate-token", spaceController.validateToken);

//Add new Member to Space
router.patch("/validate/add-member", spaceController.addMember);

// Get all users of a Space
router.get("/get-space-members/:spaceId", verifyJWT, spaceController.getSpaceMembers);

export default router;
