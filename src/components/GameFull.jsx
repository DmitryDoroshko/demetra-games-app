import React from 'react';

function GameFull({slugId}) {
  return (
    <li className="games__game">
      <div className="games__poster">
        <img className={"games__img"} src="https://picsum.photos/seed/picsum/200/300" alt="Game img"/>
      </div>
      <div className="games__info">
        <h2 className="games__name">Vampire: The Masquerade - Bloodlines 2</h2>
        <p className="games__rating">Rating: 8.5</p>
        <p className="games__release-date">Release date: Dec 18, 2022</p>

        <div className="games__additional-info">
          <p className="games__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias
            aspernatur dolorum ducimus enim explicabo fuga harum, laudantium maiores mollitia nihil nisi nobis odit
            officiis optio quod veritatis voluptatibus? Asperiores!</p>

          <a href="#" className="games__site-link">Game.com</a>

          <div className="game__slider">
          </div>
        </div>
      </div>
      <button className="games__more-details-btn">More details</button>
    </li>
  );
}

export default GameFull;