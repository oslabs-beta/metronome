import {db} from '../../backend/db/sqlmodel.js'
import bcrypt from 'bcrypt';
const saltRounds = 10;

const userController = {
    async createUser(req, res, next) {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return next({err : "Error ccreating a new user, missing first name, last name, email, or password"}) ;
        bcrypt.hash(password, saltRounds, async function(err, hash) {
          const queryStr = `INSERT INTO users (username, password) VALUES ('${email}','${hash}');`;
          const result =  await db.query(queryStr);
          return next();
        });
    },

    async getUser(req, res, next) {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) return next({err: 'incorrect credentials'});
        const queryStr = `SELECT * FROM users WHERE username = '${email}';`;
        const result = await db.query(queryStr);
        if(result.rows[0]){
          const hash = result.rows[0].password
          bcrypt.compare(password, hash, function(err, match){
            if (match){
              res.locals.user = result.rows[0]
              return next();
            }
            else{
              throw new Error('could not match with database')
            }
          })
        }
        else{
          throw new Error('could not match with database')
        }
      }
}

export default userController