import { Anime } from '../models/anime.model.js'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';

const addToWatchList = async (req, res, next) => {
    
    try {
        
        const user = req.user;
        const animeId = req.body.animeId;

        if(!user) throw new ApiError(401, "User not found");

        const isInWatchList = user.watchList.some(anime => anime._id.equals(animeId));

        if(isInWatchList){
            return;
        }

        const anime = await Anime.findById(animeId);

        if(!anime) throw new ApiError(401, "Anime not found")

        user.watchList.push(anime._id);

        await user.save()

        return res.status(200).json(user)

    } catch (error) {
        next(error);
    }

}

const removeFromWatchList = async (req, res, next) => {

    try {
        
        const user = req.user;
        const animeId = req.body.animeId;

        if(!user) throw new ApiError(401, "User not found");

        user.watchList = user.watchList.filter(id => !id.equals(animeId));

        await user.save();

        return res.status(200).json(user);

    } catch (error) {
        next(error);
    }

}

export { addToWatchList, removeFromWatchList }