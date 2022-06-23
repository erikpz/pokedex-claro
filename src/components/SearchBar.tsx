import React from "react";
import "../styles/search-bar.scss";
import pokebola from "../assets/icons/pokebola.png";

export const SearchBar = () => {
  return (
    <div className="searchContainer">
      <input
        type="text"
        className="searchBar boxShadow"
        placeholder="Busca un pokemón"
      />
      <img alt="" src={pokebola} />
    </div>
  );
};
