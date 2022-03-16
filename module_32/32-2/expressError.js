/* ExpressError extends the normal JS error so 
we can easily add a status when we make
an instance of it.

Thi error-handling middleware will return this.
*/

class Expresserror extends Error {
    constructor(messsage, status){
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}