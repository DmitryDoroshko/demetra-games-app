import React from 'react';

function GamePartial(props) {
  return (
    <li className="games__game">
      <div className="games__poster">
        <img className={"games__img"} src="https://picsum.photos/seed/picsum/200/300" alt="Game img"/>
      </div>
      <h2 className="games__name">Vampire: The Masquerade - Bloodlines 2</h2>
      <p className="games__rating">Rating: 8.5</p>
      <p className="games__release-date">Release date: Dec 18, 2022</p>
      <a href="#" className="games__more-details-btn">More details</a>
    </li>
  );
}

export default GamePartial;