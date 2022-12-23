import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchGamesByName} from "../store/game/gameSlice";

function Header(props) {
  const [gameSearchValue, setGameSearchValue] = useState("");
  const dispatch = useDispatch();

  const gameSearchValueChangeHandler = ({target: {value}}) => {
    setGameSearchValue(value);
  };

  const headerSearchFormSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchGamesByName({gameName: gameSearchValue}));
    setGameSearchValue("");
  };

  return (
    <header className="header">
      <form className="search-form" onSubmit={headerSearchFormSubmitHandler}>
        <input type="text"
               className="search-form__input"
               placeholder={"Search"}
               value={gameSearchValue}
               onChange={gameSearchValueChangeHandler}/>
        <button type={"submit"} className={"search-form__button"}>Search Games</button>
      </form>
    </header>
  );
}

export default Header;