const express = require("express");
const aniketRouter = express.Router();

// const Contact = require("../model/ContactModel")
const {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
} = require("../controller/ContactController");


const validateToken = require("../middleware/vlidateTokenHandler")
aniketRouter.use(validateToken)

aniketRouter.route("/").get(getContacts);

aniketRouter.route("/").post(createContact);

aniketRouter.route("/:id").get(getContact);

aniketRouter.route("/:id").put(updateContact);

aniketRouter.route("/:id").delete(deleteContact);

module.exports = aniketRouter;
