import jwt from 'jsonwebtoken';
import { ApiError } from './ApiError.js';
import { User } from '../models/user.model.js';

const verifyJWT = async (req, res, next) => {
   try {
        const token = req.cookies.access_token;

        if(!token) throw new ApiError(401, "Unauthorized")

        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if(error) throw new ApiError(403, "Forbidden")
          
          const newUser = await User.findById(user.id).select('-password');
          req.user = newUser;
          next();
        })
   } catch (error) {
        next(error);
   }
}

export { verifyJWT }