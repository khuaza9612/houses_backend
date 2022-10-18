const {User} = require('../db.js');
const { Router } = require('express');
const sequelize = require('../db');
const {bcrypt} = require("bcrypt");
const generarTokenID=require('../utils/generarTokenUser.js');
const {createSendToken}=require('./authcontroller')

const PostUser = async (req, res) => {
    const {name,lastName,email,image,password,passConfirmation,rol,isBlocked,clave}=req.body;
    const use=await User.findOne({where:{email}});
    const comprePass=(a,b)=>{
        if(a===b){
            return true;
        }
        return false;
    };
    if(use){
        return res.status(400).json({msg:'User already exists'});
    }else if(!comprePass(password,passConfirmation)){
        return res.status(400).json({msg:'Password does not match'});
    }

    const beforeCreate=async(user)=>{
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        user.passConfirmation=user.password;}
    const newUser=await User.create({name,lastName,email,image,password,passConfirmation,rol,isBlocked:"false",clave:generarTokenID()});
    const createdUser = newUser.dataValues;

  
  
  return createSendToken(newUser, 201, res);

};
const GetallUser = async (req, res) => {
    const user=await User.findAll();
    if(!user){
        return res.status(400).json({msg:'User not found'});
    }
    res.json(user);

   
}
const GetUserid = async (req, res) => {
    const {id}=req.params;
    const user=await User.findOne({where:{id}});
    if(!user){
        return res.status(400).json({msg:'User not found'});
    }
}

const DeleteUser = async (req, res) => {
    const {id}=req.params;
    const user=await User.findOne({where:{id}});
    if(!user){
        return res.status(400).json({msg:'User not found'});
    }
    await User.destroy({where:{id}});
    res.json({msg:'User deleted'});
}

const PutUser = async (req, res) => {
    const {id}=req.params;
    const {name,lastName,image,password,passConfirmation,rol,isBlocked,clave}=req.body;
    const user=await User.findOne({where:{id}});
    if(!user){
        return res.status(400).json({msg:'User not found'});
    }
    await User.update({name,lastName,image,password,passConfirmation,rol,isBlocked,clave},{where:{id}});
    res.json({msg:'User updated'});
}
module.exports={
        PostUser,
        GetallUser,
        GetUserid,
        DeleteUser,
        PutUser
    };