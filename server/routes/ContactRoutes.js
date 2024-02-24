const express = require("express");
const router = express.Router();

const Contact = require("../model/ContactModel")

router.route("/").get((req, res) => {
  res.status(200).json({ message: "get all contacts " });
});


router.route("/").post( async (req, res) => {
  res.status(200).json({ message: "create contacts " })
});

router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `get contact from ${req.params.id}  `});
  });

router.route("/:id").put((req, res) => {
  res.status(200).json({ message: `update contact from ${req.params.id}  `});
});

router.route("/:id").delete((req, res) => {
  res.status(200).json({ message: `delete contacts from ${req.params.id} ` });
});

module.exports = router;
