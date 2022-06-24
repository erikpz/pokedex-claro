import React, { FC } from "react";
import "../styles/pokemon-card.scss";

interface IPokemonCardProps {
  pokemon: any;
}

export const PokemonCard: FC<IPokemonCardProps> = (props) => {
  return (
    <div className="cardContainer boxShadow">
      <div className="imgContainer">
        <img
          alt={props.pokemon.name}
          src={props.pokemon.sprites.other.home.front_default}
        />
      </div>
      <div className="infoContainer">
        <p># {props.pokemon.id}</p>
        <p style={{ textTransform: "capitalize" }}>{props.pokemon.name}</p>
        <div className="chipsContainer">
          {props.pokemon.types.map((type: any) => (
            <span className="chip" key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
