const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../expressError");

router.get('/', async (req, res, next)=>{
     /*
    Return info on invoices: like {invoices: [{id, comp_code}, ...]}
    */
   try{
       const results = await db.query(`SELECT * FROM invoices`);
       return res.json(results.rows);
   } catch (err) {
       return next(err);
   }
})


router.get('/:id', async (req, res, next)=>{
    /*
    Returns obj on given invoice.
    If invoice cannot be found, returns 404.
    Returns {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
    */
    try{
        const {id} = req.params;
        const results = await db.query(
            `SELECT * FROM invoices
            WHERE id=$1`, [id]
        )
        if(results.rows.length === 0){
            throw new ExpressError(`Can't find invoice with id ${id}`, 404)
        }
        return res.json(results.rows);
    } catch (err){
        return next(err);
    }
})

router.post('/', async (req, res, next)=>{
    /*
     Adds an invoice.
    Needs to be passed in JSON body of: {comp_code, amt}
    Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
    */
   try{
       const {comp_code, amt} = req.body;
       const response = await db.query(`INSERT INTO invoices (comp_code, amt)
       VALUES ($1, $2) RETURNING *`, [comp_code, amt]);
       return res.status(201).json(response.rows);
   } catch (err){
       return next(err);
   }
})


router.patch('/:id', async (req, res, next)=>{
    /*
    Updates an invoice.
    If invoice cannot be found, returns a 404.
    Needs to be passed in a JSON body of {amt}
    Returns: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
    */
   try{
       const {paid, paid_date} = req.body;
       const {id} = req.params;
       const results = await db.query(`UPDATE invoices
       SET paid=$1, paid_date=$2 WHERE id=$3
       RETURNING *`, [paid, paid_date, id]);

       if(results.rows.length === 0){
        throw new ExpressError(`Can't find invoice with id ${id}`, 404)
    }

       return res.send(results.rows[0]);
   } catch (err){
       return next(err);
   }
})

router.delete('/:id', async (req, res, next)=>{
    /*
    Deletes an invoice.
    If invoice cannot be found, returns a 404.
    Returns: {status: "deleted"}
    */
    try{
        const {id} = req.params;
        const results = await db.query(`DELETE FROM invoices
        WHERE id=$1 RETURNING *`, [id]);

        if(results.rows.length === 0){
            throw new ExpressError(`Can't find invoice with id ${id}`, 404)
        }
        return res.send('deleted');
    } catch(err){
        return next(err);
    }
})

module.exports = router;