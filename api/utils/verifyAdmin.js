import { ApiError } from "../utils/ApiError.js"


const verifyAdmin = (req, res, next) => {
    try {

        if(req.user.role !== 'admin') throw new ApiError(401, "Unauthorized");

        next();
        
    } catch (error) {
        next(error)
    }
}


export { verifyAdmin }