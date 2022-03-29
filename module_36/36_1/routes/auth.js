const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const User = require("../models/user");
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = ('../config.js');
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next)=>{
    try{
        const {username, password} = req.body;
        if (await User.authenticate(username, password)){
            User.updateLoginTimestamp(username);
            const token = jwt.sign({username}, SECRET_KEY)
            return res.json({token});
        } 

        throw new ExpressError("Invalid Username or Password", 400);
    } catch(err){
        next(err)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next)=>{
    try {
        const userInfo = User.register(req.body);
        const token = jwt.sign(userInfo, SECRET_KEY)
        return res.json({token});
    } catch (err){
        if (err.code === '23505'){
            next(new ExpressError("Username taken.  Please pick another!", 400));
        }
        next(err);
    }
})