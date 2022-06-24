import React, { FC } from "react";
import "../styles/pokemon-card.scss";
import { getTypeColor } from "../utils/helpers";

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
        <p className="numPok"># {props.pokemon.id}</p>
        <p className="namePok" style={{ textTransform: "capitalize" }}>
          {props.pokemon.name}
        </p>
        <div className="chipsContainer">
          {props.pokemon.types.map((type: any) => (
            <span
              className="chip"
              key={type.type.name}
              style={{
                color: getTypeColor(type.type.name).color,
                backgroundColor: getTypeColor(type.type.name).bgcolor,
              }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
