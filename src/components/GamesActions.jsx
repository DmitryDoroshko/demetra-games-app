import React from 'react';
import Dropdown from "react-dropdown";

const options = [
  {value: 'sort-by-rating-asc', label: 'Sort by Rating ASC'},
  {value: 'sort-by-rating-desc', label: 'Sort by Rating DESC'},
  {value: 'sort-by-release-date-asc', label: 'Sort by Release-date ASC'},
  {value: 'sort-by-release-date-desc', label: 'Sort by Release-date DESC'},
];

const defaultOption = options[0];

function GamesActions(props) {
  const onSelect = (e) => {
    console.log("OnSelect", e.value);
  };

  return (
    <div className="main__actions">
      <div className="main__select-dropdown">
        <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option"/>
      </div>

      <div className="main__filter-by-platform">
        <input type="text" placeholder={"Filter by platform"}/>
      </div>

      <div className="main__search-by-name">
        <input type="text" placeholder={"Search game by name"}/>
      </div>
    </div>
  );
}

export default GamesActions;