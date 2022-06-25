import React, { FC } from "react";
import "../styles/pokemon-detail.scss";
import { getTypeColor } from "../utils/helpers";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
interface IPokemonDetailProps {
  pokemon: any;
  onClose: () => void;
}

export const PokemonDetail: FC<IPokemonDetailProps> = (props) => {
  console.log(props);
  return (
    <div className="detailContainer">
      <div className="detailBox">
        <div className="imgsContainer">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            <SwiperSlide>
              <img
                alt={props.pokemon.name}
                src={props.pokemon.sprites.other.home.front_default}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt={props.pokemon.name}
                src={props.pokemon.sprites.other.home.front_shiny}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="detailInfo">
          <p>#{props.pokemon.id}</p>
          <p>{props.pokemon.name}</p>
          <div className="chipsContainer">
            {props.pokemon.types.map((type: any) => (
              <span
                className="chipDetail"
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
    </div>
  );
};
