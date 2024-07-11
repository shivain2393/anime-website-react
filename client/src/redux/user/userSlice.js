import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        signOutStart: (state) => {
            state.loading = true;
        },

        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },

        signOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})


export const {
    signInStart, signInSuccess, signInFailure,
    signOutStart, signOutSuccess, signOutFailure
} = userSlice.actions;

export default userSlice.reducer;

