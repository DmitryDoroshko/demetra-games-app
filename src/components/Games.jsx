import React, {useEffect, useMemo, useState} from 'react';
import GamePartial from "./GamePartial";
import {useSelector} from "react-redux";
import {selectFilteredGames, selectIsFiltering, selectLoadedGames} from "../store/game/gameSlice";
import Pagination from "./Pagination";

const PAGE_SIZE = 10;

function Games() {
  const [currentPage, setCurrentPage] = useState(1);
  const gamesLoaded = useSelector(selectLoadedGames);
  const gamesFiltered = useSelector(selectFilteredGames);
  const areGamesLoading = useSelector(state => state.game.loading);

  const isFiltering = useSelector(selectIsFiltering);
  const gamesToDisplay = isFiltering ? gamesFiltered : gamesLoaded;

  // Memoize the current page's games loaded array in order to not recompute it multiple times
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return gamesToDisplay.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, gamesToDisplay]);

  // If games have been loaded again, set the current page number to 1, otherwise ignore
  useEffect(() => {
    setCurrentPage(1);
  }, [gamesToDisplay]);

  let gamesContent;

  if (currentTableData.length === 0 && !areGamesLoading) {
    gamesContent = <h2 className={"games__placeholder"}>No games found, please search one.</h2>;
  }

  if (areGamesLoading) {
    gamesContent = <h2 className={"games__placeholder"}>Loading...</h2>;
  }

  if (currentTableData.length > 0) {
    gamesContent = currentTableData.map(({name, slug, platforms, background_image, rating, released}) => {
      return <GamePartial key={slug} gameName={name} gamePlatforms={platforms} gamePoster={background_image}
                          gameRating={rating} gameReleased={released} gameSlug={slug}/>;
    });
  }

  return (
    <>
      <ul className="games">
        {gamesContent}
      </ul>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={gamesToDisplay.length}
        pageSize={PAGE_SIZE}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}

export default Games;