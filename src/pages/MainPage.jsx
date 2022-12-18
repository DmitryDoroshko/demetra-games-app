import React from 'react';
import GamesActions from "../components/GamesActions";
import Games from "../components/Games";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainPage(props) {
  return (
    <div className={"app"}>
      <Header/>
      <main className={"main"}>
        <div className="main__titles">
          <h1>Top picks</h1>
          <p>Search a game</p>
        </div>
        <div className="main__games">
          <GamesActions/>
          <Games/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MainPage;