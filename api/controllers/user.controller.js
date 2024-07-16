import { ApiError } from "../utils/ApiError.js";

const updateUserDetails = async (req, res, next) => {
    try {
        
        const user = req.user;
        if(!user) throw new ApiError("User not found")
        console.log(req.body)

        const { avatar, backgroundImage } = req.body;

        if(!avatar && !backgroundImage) throw new ApiError("No fields to be updated");

        if (avatar) {
            user.avatar = avatar;
        }
        if (backgroundImage) {
            user.backgroundImage = backgroundImage;
        }

        await user.save();

        return res.status(200).json(user);
        
    } catch (error) {
        next(error);
    }
}


export { updateUserDetails }