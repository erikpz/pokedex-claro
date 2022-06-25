import React, { FC } from "react";
import "../styles/pokemon-detail.scss";
interface IPokemonDetailProps {
  pokemon: any;
  onClose: () => void;
}

export const PokemonDetail: FC<IPokemonDetailProps> = (props) => {
  console.log(props);
  return (
    <div className="detailContainer" onClick={props.onClose}>
      <div className="detailBox">
        <div className="imgContainer">
          <img
            alt={props.pokemon.name}
            src={props.pokemon.sprites.other.home.front_default}
          />
        </div>
      </div>
    </div>
  );
};
