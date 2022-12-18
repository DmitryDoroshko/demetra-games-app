import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <form className="search-form">
        <input type="text" className="search-form__input" placeholder={"Search"}/>
        <button type={"submit"} className={"search-form__button"}>Search Games</button>
      </form>
    </header>
  );
}

export default Header;