import { ContactModel } from '../models/Contact.js';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js'; 

const AddContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone} = req.body;
    try {
        const newContact = new ContactModel({
            name,
            email,
            phone,
            postedBy: req.user._id 
        });

        const savedContact = await newContact.save();
        return res.status(201).json({ success: true, contact: savedContact });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const GetContacts = async (req, res) => {
    try {
        const contacts = await ContactModel.find({ postedBy: req.user._id });
        return res.status(200).json({ success: true, contacts });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export { AddContact, GetContacts };
