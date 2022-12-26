import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  searchGameByName,
  selectFilteredGames, selectFilterPlatformString,
  selectIsFiltering,
  selectLoadedGames,
  selectSearchNameString, setFilterPlatformString, setSearchNameString
} from "../store/game/gameSlice";
import {
  sortGamesByRatingAscending,
  sortGamesByRatingDescending,
  sortGamesByReleaseDateAscending,
  sortGamesByReleaseDateDescending,
  filterGamesByPlatformName,
  searchGameByNameAndFilterByPlatform,
} from "../store/game/gameSlice";

const options = [
  {value: 'sort-by-rating-asc', label: 'Sort by Rating ASC'},
  {value: 'sort-by-rating-desc', label: 'Sort by Rating DESC'},
  {value: 'sort-by-release-date-asc', label: 'Sort by Release-date ASC'},
  {value: 'sort-by-release-date-desc', label: 'Sort by Release-date DESC'},
];

function GamesActions() {
  const dispatch = useDispatch();
  const gamesPlatformFilterString = useSelector(selectFilterPlatformString);
  const gameNameSearchString = useSelector(selectSearchNameString);
  const loadedGames = useSelector(selectLoadedGames);
  const [sortGamesOptionValue, setSortGamesOptionValue] = useState("sort-by-rating-asc");

  let actionsContent = <p className={"main__actions-placeholder"}>Actions will appear after searching a game</p>;

  const sortGamesByOption = (optionName) => {
    if (optionName === 'sort-by-rating-asc') {
      dispatch(sortGamesByRatingAscending());
    } else if (optionName === 'sort-by-rating-desc') {
      dispatch(sortGamesByRatingDescending());
    } else if (optionName === 'sort-by-release-date-asc') {
      dispatch(sortGamesByReleaseDateAscending());
    } else if (optionName === 'sort-by-release-date-desc') {
      dispatch(sortGamesByReleaseDateDescending());
    }
  };

  const selectSortGamesByOptionHandler = ({target: {value}}) => {
    setSortGamesOptionValue(value);
    sortGamesByOption(value);
  };

  const gamesPlatformFilterStringChangeHandler = ({target: {value}}) => {
    const gamesPlatformStringValueTrimmed = value.trim();
    dispatch(setFilterPlatformString(gamesPlatformStringValueTrimmed));

    if (gamesPlatformFilterString !== "" && gameNameSearchString !== "") {
      dispatch(searchGameByNameAndFilterByPlatform());
    } else {
      dispatch(filterGamesByPlatformName(gamesPlatformStringValueTrimmed));
    }
    sortGamesByOption(sortGamesOptionValue);
  };

  const gameNameSearchStringChangeHandler = ({target: {value}}) => {
    const gamesNameStringValueTrimmed = value.trim();
    dispatch(setSearchNameString(gamesNameStringValueTrimmed));

    if (gamesPlatformFilterString !== "" && gameNameSearchString !== "") {
      dispatch(searchGameByNameAndFilterByPlatform());
    } else {
      dispatch(searchGameByName(value));
    }
    sortGamesByOption(sortGamesOptionValue);
  };

  if (loadedGames.length > 0) {
    actionsContent = (
      <>
        <div className="main__select-dropdown">
          <select name="main-select-dropdown" id="main-select-dropdown" onChange={selectSortGamesByOptionHandler}>
            {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        <div className="main__filter-by-platform">
          <input type="text" placeholder={"Filter by platform"} value={gamesPlatformFilterString.toString()}
                 onChange={gamesPlatformFilterStringChangeHandler}/>
        </div>

        <div className="main__search-by-name">
          <input type="text" placeholder={"Search game by name"} value={gameNameSearchString.toString()}
                 onChange={gameNameSearchStringChangeHandler}/>
        </div>
      </>);
  }

  return (
    <div className="main__actions">
      {actionsContent}
    </div>
  );
}

export default GamesActions;