import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    animes: [],
    status: 'idle',
    error: null,
}

const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {

        getAnimesStart : (state) => {
            state.status = 'loading';
        },

        getAnimesSucess: (state, action) => {
            state.animes = action.payload;
            state.status = 'success';
        },

        getAnimesFailure: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        }
    } 
})


export const  { getAnimesStart, getAnimesSucess, getAnimesFailure } = animeSlice.actions;

export default animeSlice.reducer;