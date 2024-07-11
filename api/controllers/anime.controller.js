import { Anime } from '../models/anime.model.js'
import { ApiError } from '../utils/ApiError.js'

const addAnime = async (req, res, next) => {
    try {

        const newAnime = await new Anime(req.body);

        const savedAnime = await newAnime.save();

        return res.status(200).json(savedAnime);
        
    } catch (error) {
        next(error);
    }
}


export { addAnime }