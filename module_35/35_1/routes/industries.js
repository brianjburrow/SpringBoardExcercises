const express = require("express");
const router = new express.Router();
const db = require('../db');
const ExpressError = require("../expressError");




router.get('/:ind_code', async (req, res, next)=>{
  /*
  Return an industry, and all companies for that industry
  */
  try{
    const {ind_code} = req.params;
    const results = await db.query(`SELECT i.industry, c.code
                                    FROM industries AS i 
                                    LEFT JOIN companies_industries AS ci 
                                    ON i.ind_code = ci.ind_code
                                    LEFT JOIN companies AS c
                                    ON ci.comp_code = c.code
                                    WHERE i.ind_code = $1`, [ind_code]);
    if (results.rows.length === 0){
      throw new ExpressError(`No industry found with code ${ind_code}`);
    }
    const {industry} = results.rows[0];
    const tags = results.rows.map(r=>r.code);
    return res.send({industry, companies:tags})
  } catch (err) {
      return next(err);
  }
})

router.get('/', async (req, res, next) =>{
  /*
     Return all industries, and show the company code(s) for that industry
     */
    try{
      const results = await db.query(`SELECT i.industry, c.code
      FROM industries AS i 
      LEFT JOIN companies_industries AS ci 
      ON i.ind_code = ci.ind_code
      LEFT JOIN companies AS c
      ON ci.comp_code = c.code`)
      return res.json(results.rows[0])
    } catch(error){
      return next(error);
    }
  })

router.post('/', async (req,res,next)=>{
  /* 
  add an industry to the database
  */
  try{
    const {ind_code, industry} = req.body;
    const results = await db.query(`INSERT INTO industries  (ind_code, industry)
    VALUES ($1, $2) RETURNING ind_code, industry`,[ind_code, industry]);
    return res.json(results.rows[0])
  } catch(error){
    return next(error);
  }
})

router.post('/:ind_code', async (req, res, next)=>{
    /*
   Associate a company with an industry
   */
  try{
    const {ind_code} = req.params;
    const {comp_code} = req.body;
    const results = await db.query(`INSERT INTO companies_industries  (comp_code, ind_code)
    VALUES ($1, $2) RETURNING comp_code, ind_code`,[comp_code, ind_code]);
    console.log(results)
    return res.json(results.rows[0])
  } catch (err) {
      return next(err);
  }
})

module.exports = router;