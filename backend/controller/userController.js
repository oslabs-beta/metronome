import {db} from '../../backend/db/sqlmodel.js'

const userController = {
    // Create a new user in the Database
    // Their information will be sent in the request body
    // This should send the created user
    async createUser(req, res, next) {
        console.log('this is the body request', req.body)
      const { name, email, password } = req.body;
      const queryStr = `INSERT INTO users (username, password) VALUES ('${email}','${password}');`;
      console.log(queryStr);
      if (!name || !email || !password)
        // return res.status(400).json({ error: 'Did not receive first name and/or last name'});
        return next({err : "Error ccreating a new user, missing first name, last name, email, or password"}) ;
        // add DB LOGIC HERE
        const result =  await db.query(queryStr);
        console.log("added to database", result);
        return next();
    },

    async getUser(req, res, next) {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) return next({err: 'incorrect credentials'});
        //need to verify how models work in SQL
        const queryStr = `SELECT * FROM users WHERE username = '${email}' AND password = '${password}';`;
        console.log(queryStr);
        const result = await db.query(queryStr);
        console.log('this are the username and passwords', result);
        console.log(result.rows[0])
        if(result.rows[0]){
          console.log('user found in databes, logging in')
          res.locals.user = result.rows[0]
          return next();
        }
        else{
          console.log("Incorrect user or password");
          throw new Error('could not match with database')
          
        }
        
        // User.findOne({ email: email, password: password })
        // .then((user) => {
        //   if (!user) return next({ err: 'Error in userModel.getuser: Could not find user'});
        //   else {
        //     console.log("Successfully logged in!")
        //   res.locals.user = user;
        //   return next();
        //   }
        // })
        // .catch((err) => {
        //   return next({err: 'err occurred while logging in'});
        // })
      
      }
}

export default userController