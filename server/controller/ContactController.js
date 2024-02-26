const asyncHandler = require("express-async-handler");
const Contact = require("../model/ContactModel");

// this is our logic connect to the database
// GET,POST,UPDATE,DELETE,and GET by the id  //total 5 logics

// @desc get all contacts
// @routes GET/api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
});

// @desc Create new  contacts
// @routes POST/api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone } = await req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "all filed required" });
      // res.status(400);
      // throw new Error({ message: "all field are mandatory" });
    } else {
      const contact = await Contact.create({
        name,
        email,
        phone,
      });
      res.status(201).json(contact);
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc get all contacts
// @routes GET/api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: " contact not found" });
  } else {
    res.status(200).json(contact);
  }
});

// @desc update contacts
// @routes PUT/api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: " contact not found" });
  } else {
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContact);
  }
});

// @desc delete contacts
// @routes DELETE/api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {

  try {
    


  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ message: " contact not found" });
  }

  await Contact.deleteOne();

  res.status(200).json(contact);


  } catch (error) {
    console.error(error)
  }

});

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
};
