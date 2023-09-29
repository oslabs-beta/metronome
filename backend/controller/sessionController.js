// import jwt from 'jsonwebtoken';

// const sessionController = {};

// sessionController.startSession = async (req, res, next) => {
//     try {
//       if (res.locals.status !== true) {
//         return next();
//       }
//       const { email } = req.body;
      
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: '1h',
//       })
//       res.cookie('token', token, { httpOnly: true, secure: true });
          
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   };
  
//   sessionController.isLoggedIn = async (req, res, next) => {
//     try {
//       const { token } = req.cookies;
  
//       if (!token) {
//         res.locals.loggedIn = false;
//         return next();
//       }
  
//       const loggedIn = jwt.verify(token, process.env.JWT_SECRET);
      
//       res.locals.isLoggedIn = loggedIn;
      
//       return next();
//     } catch (err) {
//       console.log(`Error: ${err}`);
//       return next(err);
//     }
//   };

//   sessionController.logout = async (req, res, next) => {
//     try {
//       res.clearCookie('token');
//       return next();
//     } catch (err) {
//       return next(err);
//     }
//   };

//   export default sessionController