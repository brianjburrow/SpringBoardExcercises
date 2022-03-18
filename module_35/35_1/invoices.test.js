process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const db = require('./db');

let testCompany, testInvoice;

beforeEach(async function(){
    const companyResults = await db.query(`INSERT INTO companies (code, name, description)
    VALUES ($1, $2, $3) RETURNING *`, ["SOKA", "SOKA", 'My website']);

    testCompany = companyResults.rows[0];
    
    const invoicesResults = await db.query(`INSERT INTO invoices ()`)
    testInvoice = invoicesResults.rows[0];
})

afterEach(async function(){
    await db.query(`DELETE FROM companies`); // delete all companies
    await db.query(`DELETE FROM invoices`); // delete all invoices
})


describe("GET /companies", ()=>{
    test("Get a list with one company", ()=>{

    });
})

describe("POST /companies", ()=>{
    test("Create a new company", ()=>{

    });
})

describe("GET /companies/code", ()=>{
    test("Get a company by code", ()=>{

    });
})


describe("PATCH /companies/code", ()=>{
    test("Update a company", ()=>{

    });
})

describe("DELETE /companies/code", ()=>{
    test("Create a new company", ()=>{

    });
})

afterAll(async function(){
    // stop connection to database so that code will terminate properly
    await db.end();
})