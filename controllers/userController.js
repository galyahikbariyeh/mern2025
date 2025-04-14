const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY =process.env.SECRET_KEY
exports.getAllUsers= async(req,res)=>{
    try{
        const users = await User.find();  
        res.status(200).json(users) 
      
    } 
    catch(error){
        res.status(500).json({message:error.message}) 
    }
}

//create user
exports.createUsers= async  (req,res) =>{
const{name,email,password}=req.body;
try {
    user={name,email,password}
    savedUser= new User(user)
    savedUser.save()

    res.status(200).json({message:'User register in successfully',savedUser})

} catch (error) {
    res.status(500).json({message:error.message}) 
}
    
}

exports.getUsersByname= async  (req,res) =>{
    const{name}=req.body;
    try {
        const user= await User.find({name:name})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
    
}

exports.updateUser= async  (req,res)=> {
    const{id}= req.params
    const{name,email,password}=req.body
    try {
        const user= await User.findByIdAndUpdate(id,{name,email,password})
        res.status(200).json({message:'user updated sussecfully'})
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
    
}

exports.deleteUser= async  (req,res)=> {
    const{id}= req.params
    
    try {
        const user= await User.findByIdAndDelete(id)
        res.status(200).json({message:'user deleted sussecfully',user:user})
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
    
}

exports.LoginUser= async (req,res) => {
    const {email, password}= req.body
    try {
        const user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({message:'User not found'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch){
            return res.status(400).json({message:'Invalid password'})
        }
      const token = jwt.sign({userId:user._id,role:user.role},SECRET_KEY,{expiresIn:'24h'})
        return res.status(200).json({message:'User logged in successfully',token:token})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
exports.authriz= async  (req,res,next) =>{
    const token=req.header('Authr')
    if(!token){
        return res.status(400).json({message:' token not found'})
    }
    try {
        const verified= jwt.verify(token,SECRET_KEY)
        req.user=verified
       // return res.status(200).json({message:'User is authinticated',user:req.user})
        next()
    } catch (error) {
        res.status(500).json({message:error.message}) 
    
    }
    
}

//admin auth
exports.Adminauthriz= async  (req,res,next) =>{
    const token=req.header('Authr')
    if(!token){
        return res.status(400).json({message:' token not found'})
    }
    try {
        const verified= jwt.verify(token,SECRET_KEY)
        
        if (verified.role !== 'admin') {
            return res.status(400).json({ message: 'you are not admin' });
           
        }
        req.user=verified
        next();
    } catch (error) {
        res.status(500).json({message:error.message}) 
    
    }
    
}