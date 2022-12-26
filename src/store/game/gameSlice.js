import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import axios from "axios";
import {API_GAMES_URL, API_GAMES_URL_WITH_PAGE_SIZE, API_KEY} from "../../utils/constants";
import {fromStringDateToObjectDate} from "../../utils/helpers";

export const fetchGamesByName = createAsyncThunk(
  "game/fetchGamesByName",
  async ({gameName}) => {
    try {
      const response = await axios.get(`${API_GAMES_URL_WITH_PAGE_SIZE}&search=${gameName}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
);

export const fetchSingleGameBySlugName = createAsyncThunk(
  "game/fetchSingleGameBySlugName",
  async ({gameSlug}) => {
    try {
      const response = await axios.get(`${API_GAMES_URL}/${gameSlug}?key=${API_KEY}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

const initialState = {
  loadedGames: [],
  loading: false,
  error: null,
  filteredGames: [],
  isFiltering: false,
  searchNameString: "",
  filterPlatformString: "",
  gameSpecific: null,
  errorFetchingSingleGame: null,
  loadingSingleGame: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSearchNameString: (state, action) => {
      state.searchNameString = action.payload;
    },
    setFilterPlatformString: (state, action) => {
      state.filterPlatformString = action.payload;
    },
    sortGamesByRatingAscending: (state) => {
      if (!state.isFiltering) {
        state.loadedGames = state.loadedGames.sort((firstGame, secondGame) => {
          return firstGame.rating - secondGame.rating;
        });
      } else {
        state.filteredGames = state.filteredGames.sort((firstGame, secondGame) => {
          return firstGame.rating - secondGame.rating;
        });
      }
    },
    sortGamesByRatingDescending: (state) => {
      if (!state.isFiltering) {
        state.loadedGames = state.loadedGames.sort((firstGame, secondGame) => {
          return secondGame.rating - firstGame.rating;
        });
      } else {
        state.filteredGames = state.filteredGames.sort((firstGame, secondGame) => {
          return secondGame.rating - firstGame.rating;
        });
      }
    },
    sortGamesByReleaseDateAscending: (state) => {
      if (!state.isFiltering) {
        state.loadedGames = state.loadedGames.sort((firstGame, secondGame) => {
          return fromStringDateToObjectDate(firstGame.released) - fromStringDateToObjectDate(secondGame.released);
        });
      } else {
        state.filteredGames = state.filteredGames.sort((firstGame, secondGame) => {
          return fromStringDateToObjectDate(firstGame.released) - fromStringDateToObjectDate(secondGame.released);
        });
      }
    },
    sortGamesByReleaseDateDescending: (state) => {
      if (!state.isFiltering) {
        state.loadedGames = state.loadedGames.sort((firstGame, secondGame) => {
          return fromStringDateToObjectDate(secondGame.released) - fromStringDateToObjectDate(firstGame.released);
        });
      } else {
        state.filteredGames = state.filteredGames.sort((firstGame, secondGame) => {
          return fromStringDateToObjectDate(secondGame.released) - fromStringDateToObjectDate(firstGame.released);
        });
      }
    },
    filterGamesByPlatformName: (state, action) => {
      const searchedPlatformNameLowerCase = action.payload.toLowerCase();
      if (searchedPlatformNameLowerCase === "") {
        state.isFiltering = false;
      } else {
        state.isFiltering = true;
        state.filteredGames = state.loadedGames.filter((game) => {
            const gameHasSearchedPlatformMatch = game.platforms.some((platformObj) => {
              return platformObj.platform.name.toLowerCase()
                .includes(searchedPlatformNameLowerCase);
            });
            return gameHasSearchedPlatformMatch;
          }
        );
      }
    },
    searchGameByName: (state, action) => {
      const searchedGameNameLowerCase = action.payload;
      if (searchedGameNameLowerCase === "") {
        state.isFiltering = false;
        return;
      }
      state.isFiltering = true;
      state.filteredGames = state.loadedGames.filter((game) => {
        return game.name.toLowerCase().includes(searchedGameNameLowerCase);
      });
    },
    searchGameByNameAndFilterByPlatform: (state) => {
      const {searchNameString, filterPlatformString} = state;

      if (searchNameString === "" && filterPlatformString === "") {
        state.isFiltering = false;
        return;
      }

      state.filteredGames = state.loadedGames.filter(game => {
        if (!game.name.toLowerCase().includes(searchNameString)) {
          return false;
        }
        const gameHasSearchedPlatformMatch = game.platforms.some((platformObj) => {
          return platformObj.platform.name.toLowerCase()
            .includes(filterPlatformString);
        });
        return gameHasSearchedPlatformMatch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGamesByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGamesByName.fulfilled, (state, action) => {
        // Sort the games loaded in ascending order and set them as state
        state.loadedGames = action.payload.sort((firstGame, secondGame) => {
          return firstGame.rating - secondGame.rating;
        });
        state.loading = false;
      })
      .addCase(fetchGamesByName.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(fetchSingleGameBySlugName.pending, (state) => {
        state.loadingSingleGame = true;
      })
      .addCase(fetchSingleGameBySlugName.fulfilled, (state, action) => {
        state.gameSpecific = action.payload;
        state.loadingSingleGame = false;
      })
      .addCase(fetchSingleGameBySlugName.rejected, (state, action) => {
        state.errorFetchingSingleGame = action.payload;
        state.loadingSingleGame = false;
      });
  },
});

export const {
  sortGamesByRatingAscending,
  sortGamesByRatingDescending,
  sortGamesByReleaseDateAscending,
  sortGamesByReleaseDateDescending,
  filterGamesByPlatformName,
  searchGameByName,
  searchGameByNameAndFilterByPlatform,
  setSearchNameString,
  setFilterPlatformString,
} = gameSlice.actions;

export const selectLoadedGames = state => state.game.loadedGames;
export const selectFilteredGames = state => state.game.filteredGames;
export const selectIsFiltering = state => state.game.isFiltering;
export const selectSearchNameString = state => state.game.searchNameString;
export const selectFilterPlatformString = state => state.game.filterPlatformString;

export default gameSlice.reducer;