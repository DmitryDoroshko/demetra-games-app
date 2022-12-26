import React from 'react';
import Footer from "../components/Footer";
import GameFull from "../components/GameFull";
import {useParams} from "react-router-dom";

function GameSpecificPage() {
  const {slugId} = useParams();
  return (
    <div className={"app"}>
      <GameFull slugId={slugId}/>
      <Footer/>
    </div>
  );
}

export default GameSpecificPage;