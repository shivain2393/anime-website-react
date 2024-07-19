import { Anime } from '../models/anime.model.js'
import { ApiError } from '../utils/ApiError.js'

const addAnime = async (req, res, next) => {
    try {

        const newAnime = await new Anime(req.body);

        if(!newAnime) throw new ApiError(401, "Please Enter all fields")

        const savedAnime = await newAnime.save();

        const allAnimes = await Anime.find({}).sort({ title: 1 });

        return res.status(200).json(allAnimes);
        
    } catch (error) {
        next(error);
    }
}

const deleteAnime = async (req, res, next) => {
    try {
        const { animeId } = req.body;
        
        const deletedAnime = await Anime.findByIdAndDelete(animeId);

        if(!deletedAnime) throw new ApiError(404, "Anime not found");

        const allAnimes = await Anime.find({}).sort({ title: 1 });

        return res.status(200).json(allAnimes);

    } catch (error) {
        next(error);
    }
}

const showAllAnimes = async (req, res, next) => {
    
    try {
        const allAnimes = await Anime.find({}).sort({ title: 1 });
        return res.status(200).json(allAnimes)
    } catch (error) {
        next(error)
    }
}

export { addAnime, deleteAnime, showAllAnimes  }