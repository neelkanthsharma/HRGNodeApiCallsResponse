const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const jwt = require('express-jwt')
const config = require('../config');

module.exports = {
    authenticate,
    create, 
    reset,
    forget
};

async function authenticate(req) {
    const user = await User.findOne({email: req.body.email});
    if( !user) {
        throw `Email Doesn't exist`;
    }
    if (user && bcrypt.compareSync(req.body.password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
       
        return {
            ...userWithoutHash
        };
    }
}

async function create(req) {  
    if (await User.findOne({ email: req.body.email })) {
        throw `Email  ${req.body.email} is already Registerd`;
    }
    const user = new User(req.body);
    user.hash = bcrypt.hashSync(req.body.password, 10);
    

    // save user
    await user.save();
   
}
async function reset(req) {  
    if (! await User.findOne({ email: req.body.email })) {
        throw `Email  ${req.body.email} isn't Registerd with us `;
    } else {
        if(req.body.newPassword === req.body.retypeNewPassword){
            let passwordUpdate = {
                $set: {password : req.body.newPassword, hash: bcrypt.hashSync(req.body.newPassword, 10)},
            }
            await User.findOneAndUpdate({email: req.body.email}, passwordUpdate);

        } else {
            throw "password not matched";
        }
    }      
}

async function forget(req, res){
    const user =  await User.findOne({email:req.body.email});
    if (user) {
        var resetlink = `http://localhost:4000/users/reset`;
        reset(req);
        return  res.send({resetlink});
    }
    else {
        throw `Email  ${req.body.email} isn't Registerd with us `;
    }
        
    
    
}