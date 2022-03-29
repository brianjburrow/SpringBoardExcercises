const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get('/', async (req, res, next)=>{
    try{
        const users = await User.all();
        return res.json({users});
    } catch(err){
        return next(err);
    }
})



/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get('/:username', async (req, res, next)=>{
    try{
        const user = await User.get(req.params.userame);
        return res.json({user});
    } catch(err){
        return next(err);
    }
})


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get('/:username/to', async (req, res, next)=>{
    try{
        const messagesTo = await User.messagesTo(req.params.userame);
        return res.json({messagesTo});
    } catch(err){
        return next(err);
    }
})

/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get('/:username/from', async (req, res, next)=>{
    try{
        const messagesFrom = await User.messagesFrom(req.params.userame);
        return res.json({messagesFrom});
    } catch(err){
        return next(err);
    }
})