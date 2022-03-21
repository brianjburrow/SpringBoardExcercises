const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../expressError");

router.get('/', async (req, res, next)=>{
    /* Returns list of companies, 
    like {companies: [{code, name}, ...]} 
    */
   try{
    const results = await db.query(`SELECT * FROM companies`);
    return res.json(results.rows)
   }
   catch (error){
    return next(error);
   }
})

router.post('/', async (req, res, next)=>{
    /*
    Adds a company.
    Needs to be given JSON like: {code, name, description}
    Returns obj of new company: {company: {code, name, description}}
    */
    try{
        const {code, name, description} = req.body;
        const results = await db.query(`INSERT INTO companies (code, name, description)
        VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
        return res.status(201).json(results.rows)
    } catch (err){
        return next(err)
    }
})



router.get('/:code', async (req, res, next)=>{
    /*
    Return obj of company: {company: {code, name, description, invoices: [id, ...], industries:[text,text,..]}}
    If the company given cannot be found, this should return a 404 status response.
    */
   try {
       const {code} = req.params;
       console.log(code)
       const results = await db.query(
           `SELECT * FROM companies WHERE code=$1`, [code]
           )
        if(results.rows.length === 0){
            throw new ExpressError(`Can't find company with code ${code}`, 404)
        }
       return res.json(results.rows);
   } catch (error){
       return next(error);
   }
})



router.patch('/:code', async (req, res, next)=>{
    /*
    Edit existing company.
    Should return 404 if company cannot be found.   
    Needs to be given JSON like: {name, description}
    Returns update company object: {company: {code, name, description}}
    */
    try{
        const {name, description} = req.body;
        const {code} = req.params;
        const results =await db.query(`UPDATE companies 
        SET name=$1, description=$2 WHERE code=$3
        RETURNING *`, [name, description, code]);

        if(results.rows.length === 0){
            throw new ExpressError(`Can't find company with code ${code}`, 404)
        }

        return res.send(results.rows[0]);
    } catch (err){
        return next(err);
    }
})

router.delete('/:code', async (req, res, next)=>{
    /*
    Deletes company.
    Should return 404 if company cannot be found.
    Returns {status: "deleted"}
    */
    try{
        const {code} = req.params;
        
        const results = await db.query(`DELETE FROM companies
        WHERE code=$1 RETURNING *`, [code])
        console.log(results)
        if(results.rows.length === 0){
            throw new ExpressError(`Can't find company with code ${code}`, 404)
        }
        return res.send('deleted');
    } catch (err){
        return next(err);
    }
})

module.exports = router;