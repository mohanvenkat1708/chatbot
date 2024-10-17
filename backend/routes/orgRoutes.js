const express = require('express');
const router = express.Router();
const Models = require('../models/OrgModel.js');
const verifyToken = require('../middlewares/authMiddleware.js');
const authorizeRoles = require('../middlewares/roleMiddleware.js');

const Org = Models.Org;

// only managers without an organization can create an organization
//router.post('/', verifyToken, authorizeRoles("manager"),async (req, res)=>{
router.post('/', async (req, res)=>{
    try{
        console.log(req.body);
        const newOrg = new Org(req.body);
        const savedOrg = await newOrg.save();
        res.status(201).send(savedOrg);
    }
    catch(err){
        res.send(err.message);
    }
});

// anyone can see the list of organizations
router.get('/', async (req, res)=>{
    try{
        const orgList = await Org.find();
        console.log(orgList);
        res.status(200).send(orgList);
    }
    catch(err){
        res.send(err.message);
    }
});

// only an organization's manager can edit an organization's details
router.patch('/:id', verifyToken, authorizeRoles("manager"), async (req, res)=>{
    try{
        const { id } = req.params;
        const updates = req.body;

        const updatedOrg = await Org.findByIdAndUpdate(id, updates, {new: true});
        console.log(updatedOrg);
        res.json(updatedOrg);
    }
    catch(err){
        res.send(err.message);
    }
});


router.get('/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const organization = await Org.findById(id);
        if(!organization){
            return res.status(404).send("Organization not found!!!");
        }
        console.log(organization);
        res.send(organization);
    }
    catch(err){
        res.send(err.message);
    }
});

// only admin can delete an organization
router.delete('/:id', verifyToken, authorizeRoles("admin"), async (req, res)=>{
    try{
        const { id } = req.params;
        const organization = await Org.findByIdAndDelete(id);
        if(!organization){
            return res.status(404).send("Organization not found!!!");
        }
        console.log(organization);
        res.status(200).send("Organization deleted successfully!");
    }
    catch(err){
        res.send(err.message);
    }
});



module.exports = router;