import React, {Fragment} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameFull from "../components/GameFull";
import {useParams} from "react-router-dom";

function GameSpecificPage(props) {
  const {slugId} = useParams();
  return (
    <div className={"app"}>
      <Header/>
      <GameFull slugId={slugId}/>
      <Footer/>
    </div>
  );
}

export default GameSpecificPage;