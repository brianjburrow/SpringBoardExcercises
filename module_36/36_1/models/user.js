/** User class for message.ly */

const ExpressError = require("../expressError");
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require("../config");
const db = require('../db');


// Error types from database operations
// // duplicate unique keys
// // data type errors
// // cascading error (b/c you must delete data in another table first)

class dbErrorHandling(){
  /* 
  write checks for specific types of database errors that are returned by
  the db.query() calls. 
  */

}

/*
// retrieve the associated country from the database
        const countries = await connection.query(sql_c, p.country_id);

        if (!countries.length)
          throw new Errors.InternalServerError('country not found');

        p.country = countries[0];
*/



/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    if (!username || !password){
      throw new ExpressError("Username and password required", 400);
    }
    if (!first_name || !last_name){
      throw new ExpressError("Full name required", 400);
    }
    if (!phone){
      throw new ExpressError("Phone number requried", 400);
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    
    const results = await db.query(`INSERT INTO users 
    (username, password, first_name, last_name, phone)
    VALUES ($1, $2, $3, $4, $5) 
    returning username, password, frist_name, last_name, phone`, 
    [username, hashedPassword, first_name, last_name, phone]);
    // this could potentially return an error, and need to do error checking here
    // data base error handling.

    return results.rows[0];
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    if (!username || !password){
      throw new ExpressError("Username and password required", 400);
    }

    const results = await db.query(`SELECT username, password
    FROM USERS
    WHERE username = $1`, [username]);
    const user = results.rows[0];
    return user && await bcrypt.compare(password, user.password);
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const result = await db.query(
      `UPDATE users 
      SET last_login_at = current_timestamp
      WHERE username = $1
      RETURNING last_login_at`, [username]
    );

    if(!results.rows[0]){
      throw new ExpressError(`No user with ${username} exists`, 404);
    }

    return result.rows[0];
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(`SELECT username, first_name, last_name,
    phone from USERS
    ORDER BY username` );
    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const results = await db.query(`SELECT username, first_name, last_name,
    phone, join_at, last_login_at from USERS
    WHERE username=$1`, [username]);
    if(!results.rows[0]){
      throw new ExpressError(`No user with ${username} exists`, 404);
    }
    return results.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await db.query(`SELECT id, to_user, body, sent_at, read_at
    FROM messages
    WHERE from_user=$1`, [username]);
    return results.rows;
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(`SELECT id, from_user, body, sent_at, read_at
    FROM messages
    WHERE to_user=$1`, [username]);
    return results.rows;
  }
}


module.exports = User;