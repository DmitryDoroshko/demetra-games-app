import React from 'react';
import GamePartial from "./GamePartial";
import {useSelector} from "react-redux";
import {selectLoadedGames} from "../store/game/gameSlice";

function Games() {
  const gamesLoaded = useSelector(selectLoadedGames);

  let gamesContent = <h2 className={"games__placeholder"}>No games found, please search one.</h2>;

  if (gamesLoaded.length > 0) {
    gamesContent = gamesLoaded.map(({name, slug, platforms, background_image, rating, released}) => {
      return <GamePartial key={slug} gameName={name} gamePlatforms={platforms} gamePoster={background_image}
                          gameRating={rating} gameReleased={released} gameSlug={slug}/>;
    });
  }

  return (
    <ul className="games">
      {gamesContent}
    </ul>
  );
}

export default Games;