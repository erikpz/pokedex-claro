import React from "react";
import pokemon from "../assets/icons/pikachu.png";
import '../styles/navbar.scss'

export const NavBar = () => {
  return (
    <div className="navBar boxShadow">
      <img alt="pokemon" src={pokemon} />
      <h2>Pokedex</h2>
    </div>
  );
};
