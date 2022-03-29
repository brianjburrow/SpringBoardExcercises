const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const jwt = require("jsonwebtoken");
const Messages = require("../models/messages");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get('/:id', async (req, res, next)=>{
    try{
        const messages = await Messages.get(req.params.id);
        return res.json(messages);
    } catch(err){
        return next(err);
    }
})


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post('/', async (req, res, next)=>{
    try{
        if (req.user.username){
            const {to_username, body} = req.body;
            const from_username = req.user.username;
            const message = await Messages.create({from_username, to_username, body});
            return res.json(message);
        }
    } catch(err){
        return next(err);
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

 router.post('/:id/read', async (req, res, next)=>{
    try{
        if (req.user.username){
            message.markRead(id);
        }
    } catch(err){
        return next(err);
    }
})