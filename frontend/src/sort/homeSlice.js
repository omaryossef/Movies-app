import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({

    name: "home",
    initialState: {
        url: {},
        genres: {},
    },
    reducers: {
        setUrl: (state, action) => {
            state.url = action.payload;
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});
export const { setUrl, setGenres } = homeSlice.actions;
export default homeSlice.reducer;
