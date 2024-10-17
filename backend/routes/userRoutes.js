const express = require('express');
const router = express.Router();
const Models = require('../models/UserModel.js');
const verifyToken = require('../middlewares/authMiddleware.js');
const authorizeRoles = require('../middlewares/roleMiddleware.js');
const User = Models.User;

// only managers can create users
// router.post('/', verifyToken, authorizeRoles("manager"),async (req, res)=>{
    router.post('/', async (req, res)=>{
    try{
        console.log(req.body);
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    }
    catch(err){
        res.send(err.message);
    }
});

// only admin can get all the users

router.get('/', verifyToken, authorizeRoles("admin"), async (req, res)=>{
    try{
        const userList = await User.find();
        console.log(userList);
        res.status(200).json(userList);
    }
    catch(err){
        res.send(err.message);
    }
});

// only admin and managers can update the user details
router.patch('/:id', verifyToken, authorizeRoles("admin", "manager"), async (req, res)=>{
    try{
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, {new: true});
        console.log(updatedUser);
        res.json(updatedUser);
    }
    catch(err){
        res.send(err.message);
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        let user = await User.findById(id);
        if(!user){
            return res.status(404).send("User not found!!!");
        }
        console.log(user);
        res.send(user);
    }
    catch(err){
        res.send(err.message);
    }
});

// only admin and managers can delete users
router.delete('/:id', verifyToken, authorizeRoles("admin", "manager"), async (req, res)=>{
    try{
        const { id } = req.params;
        let user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send("User not found!!!");
        }
        console.log(user);
        res.status(200).send("User deleted successfully!");
    }
    catch(err){
        res.send(err.message);
    }
});

// only admin and managers can get the list of users of an organization
router.get('/org/:orgId', verifyToken, authorizeRoles("admin", "manager"), async (req, res)=>{
    try{
        const { orgId } = req.params;
        let orgUserList;
        if(orgId === "null"){
            orgUserList = await User.find({organization: null});   
        }
        else{
            orgUserList = await User.find({organization: orgId});
        }
        console.log(orgUserList);
        res.send(orgUserList);
    }
    catch(err){
        res.send(err.message);
    }
});

module.exports = router;