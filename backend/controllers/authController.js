const bcrypt = require('bcrypt'); //for hashing the password
const jwt = require('jsonwebtoken');


const {User} = require('../models/UserModel');

const register = async (req, res)=>{
    const {email, password, role, organization} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({email, password: hashedPassword, role, organization});
    try{
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).send(savedUser);
        
    }
    catch(err){
        res.status(500).send(err.message);
    }
    
}

const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});

        if(!user)
        {
             return res.status(404).send(`User with email ${email} not found`);
        }

        try 
        {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).send("Password did not match!");
            }
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.status(200).json({token});
            
            
        } 
        catch (err) {
            return res.status(500).send(err.message);
        }

       

    }
    catch(err){
        res.send(err.message);
    }
    

}

module.exports = {register, login};