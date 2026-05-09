const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingContact = await Contact.findOne({
      user: req.user._id,
      email: email.toLowerCase(),
    });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "Contact already exists",
      });
    }

    const contact = await Contact.create({
      user: req.user._id,
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Contact added successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add contact",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    });
  }
};

module.exports = { getContacts, addContact, deleteContact };
