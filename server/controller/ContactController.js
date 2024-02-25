// this is our logic connect to the database
// GET,POST,UPDATE,DELETE,and GET by the id  //total 5 logics

// @desc get all contacts
// @routes GET/api/contacts
// @access public
const getContacts = async (req, res) => {
  res.status(200).json({ message: "get all contacts " });
};

// @desc Create new  contacts
// @routes POST/api/contacts
// @access public
const createContact = async (req, res) => {
  
    const {name,email,phone} = req.body;
    if (!name||!email||!phone) {
        res.status(400).json({message:"all filed required"})
        // res.status(400);
        // throw new Error("all filed  are mandatory");
    }else {
        res.status(201).json({ message: "create contacts " });
    }
};

// @desc get all contacts
// @routes GET/api/contacts/:id
// @access public
const getContact = async (req, res) => {
  res.status(200).json({ message: `get contact from ${req.params.id}  ` });
};

// @desc update contacts
// @routes PUT/api/contacts/:id
// @access public
const updateContact = async (req, res) => {
  res.status(200).json({ message: `update contact from ${req.params.id}  ` });
};

// @desc delete contacts
// @routes DELETE/api/contacts/:id
// @access public
const deleteContact = async (req, res) => {
  res.status(200).json({ message: `delete contacts from ${req.params.id} ` });
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  updateContact,
  createContact,
};
