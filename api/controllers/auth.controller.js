import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const signUp =  async (req, res, next) => {

    try{

        const { username, email, password } = req.body;

        if([username, email, password].some((field) => {
            field?.trim() === ""
        })){
            throw new ApiError(400, "All fields are required");
        }

        const lowerEmail = email.toLowerCase().trim();

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!re.test(lowerEmail)){
            throw new ApiError(400, 'Not a valid email address')
        }

        const existingUser = await User.findOne({
            $or: [{ username: username.trim() }, { email: lowerEmail }]
        })

        if(existingUser){
            throw new ApiError(400, "User with this email or username already exist")
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const user = await new User({ username: username.trim(), email: lowerEmail, password: hashedPassword });
        
        user.save();

        return res.status(201).json({ message: "User created successfully" });

    }
    catch(error){
        next(error)
    }
}


const signIn = async (req, res, next) => {

    try {
        const { username, password } = req.body;

        if(!username || !password) throw new ApiError(401, "Username and password is required")
    
        const user = await User.findOne({ username });

        if(!user) throw new ApiError(401, "User not found");
    
        const isValidUser = bcryptjs.compareSync(password, user.password);

        if(!isValidUser) throw new ApiError(401, "Invalid username or password");

        const token = jwt.sign(
            {
            id: user._id
            }
        , process.env.JWT_SECRET)

        res.cookie('access-token', token, {
            httpOnly: true,
            secure: true
        })

        const { password: userPassword, ...userWithoutPassword } = user._doc;

        return res.status(200).json(userWithoutPassword)

    } catch (error) {
        next(error);
    }
}

const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access-token');
        res.status(200).json("User has been logged out");

    } catch (error) {
        next(error);
    }
}

export { signUp, signIn, signOut }