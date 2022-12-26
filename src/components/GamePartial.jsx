import React from 'react';
import {Link} from "react-router-dom";

function GamePartial({gameSlug, gameName, gamePoster, gameRating, gameReleased, gamePlatforms}) {
  return (
    <li className="games__game">
      <div className="games__poster">
        <img className={"games__img"} src={gamePoster} alt={`${gameName} Game img `}/>
      </div>
      <h2 className="games__name">{gameName}</h2>
      <p className="games__rating">Rating: {gameRating}</p>
      <p className="games__release-date">Release date: {gameReleased}</p>
      Platforms:
      <ul className={"games__platforms"}>
        {gamePlatforms.map(({platform: {name, slug}}) => <li className={"games__platform"} key={slug}>{name}</li>)}
      </ul>
      <Link to={`game/${gameSlug}`} className="games__more-details-btn">More details</Link>
    </li>
  );
}

export default GamePartial;