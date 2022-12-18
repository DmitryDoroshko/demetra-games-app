import React from 'react';
import GamePartial from "./GamePartial";

function Games(props) {
  return (
    <ul className="games">
      <GamePartial/>
      <GamePartial/>
      <GamePartial/>
      <GamePartial/>
      <GamePartial/>
      <GamePartial/>
    </ul>
  );
}

export default Games;