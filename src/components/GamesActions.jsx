import React, {useState} from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useSelector} from "react-redux";
import {selectLoadedGames} from "../store/game/gameSlice";

function VariantsExample() {
  return (
    <>
      {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
        (variant) => (
          <DropdownButton
            as={ButtonGroup}
            key={variant}
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={variant}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
        ),
      )}
    </>
  );
}


const options = [
  {value: 'sort-by-rating-asc', label: 'Sort by Rating ASC'},
  {value: 'sort-by-rating-desc', label: 'Sort by Rating DESC'},
  {value: 'sort-by-release-date-asc', label: 'Sort by Release-date ASC'},
  {value: 'sort-by-release-date-desc', label: 'Sort by Release-date DESC'},
];

const defaultOption = options[0];

function GamesActions(props) {
  const loadedGames = useSelector(selectLoadedGames);

  let actionsContent = <p className={"main__actions-placeholder"}>Actions will appear after searching a game</p>;

  if (loadedGames.length > 0) {
    actionsContent = (
      <>
        <div className="main__select-dropdown">
          <select name="main-select-dropdown" id="main-select-dropdown">
            {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        <div className="main__filter-by-platform">
          <input type="text" placeholder={"Filter by platform"}/>
        </div>

        <div className="main__search-by-name">
          <input type="text" placeholder={"Search game by name"}/>
        </div>
      </>);
  }

  return (
    <div className="main__actions">
      {actionsContent}
    </div>
  );
}

export default GamesActions;