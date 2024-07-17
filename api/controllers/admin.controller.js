import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const getUserDetails = async (req, res, next) => {
    try {

        const { username } = req.body;

        const user = await User.findOne({ username }).select("-password -avatar -backgroundImage -watchList")

        if(!user) throw new ApiError(401, "Not Found");

        res.status(200).json(user);

        
    } catch (error) {
        next(error);
    }
}

const changeUserDetails = async (req, res, next) => {
    try {

        const { role } = req.body;
        
        const user = await User.findByIdAndUpdate(req.body._id,
            { role }, 
            { new: true, runValidators: true}
        ).select("-password -avatar -backgroundImage -watchList");

        if(!user) throw new ApiError(401, "Not Found");

        res.status(200).json(user);

    } catch (error) {
        next(error)
    }
}

export { getUserDetails, changeUserDetails };