import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_GAMES_URL} from "../../utils/constants";

const customConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const fetchGamesByName = createAsyncThunk(
  "game/fetchGamesByName",
  async ({gameName}) => {
    try {
      const response = await axios.get(`${API_GAMES_URL}&search=${gameName}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

const initialState = {
  loadedGames: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByName.fulfilled, (state, action) => {
        const newLoadedGames = state.loadedGames.concat(action.payload);
        state.loadedGames = newLoadedGames;
      })
      .addCase(fetchGamesByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGamesByName.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const selectLoadedGames = state => state.game.loadedGames;

export default gameSlice.reducer;