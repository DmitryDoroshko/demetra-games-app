import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleGameBySlugName} from "../store/game/gameSlice";

function GameFull({slugId}) {
  const dispatch = useDispatch();
  const gameFetched = useSelector(state => state.game.gameSpecific);
  const isError = useSelector(state => state.game.errorFetchingSingleGame);
  const isLoading = useSelector(state => state.game.loadingSingleGame);

  useEffect(() => {
    dispatch(fetchSingleGameBySlugName({gameSlug: slugId}));
  }, [slugId]);

  let gamesContent = <p>No game with id {slugId} found...</p>;

  if (isLoading) {
    gamesContent = <p>Game with id {slugId} is loading...</p>;
  }

  if (isError) {
    gamesContent = <p>Error fetching game...</p>;
  }

  if (gameFetched != null) {
    gamesContent = (
      <>
        <div className="games__poster">
          <img className={"games__img"} src={gameFetched.background_image} alt="Game img"/>
        </div>
        <div className="games__info">
          <h2 className="games__name">{gameFetched.name}</h2>
          <p className="games__rating">Rating: {gameFetched.rating}</p>
          <p className="games__release-date">Release date: {gameFetched.released}</p>

          <div className="games__additional-info">
            <p className="games__description" dangerouslySetInnerHTML={{__html: gameFetched.description}}></p>
            <a href={gameFetched.website} className="games__site-link">{gameFetched.website}</a>

            <div className="game__slider">
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <li className="games__game">
      {gamesContent}
    </li>
  );
}

export default GameFull;