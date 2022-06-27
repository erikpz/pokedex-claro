import React, { FC } from "react";
import "../styles/pokemon-detail.scss";
import { getTypeColor, getTypeTranslate } from "../utils/helpers";
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
                {getTypeTranslate(type.type.name)}
              </span>
            ))}
          </div>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            STATS
          </p>
          <div className="statContainer">
            {props.pokemon.stats.map((stat: any, i: number) => (
              <StatIndicator
                key={stat.stat.name}
                name={stat.stat.name}
                value={stat.base_stat}
                ind={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatIndicator = (props: any) => {
  const getColor = (ind: number) => {
    switch (ind) {
      case 0:
        return "#e63946";
      case 1:
        return "#f77f00";
      case 2:
        return "#fcbf49";
      case 3:
        return "#48cae4";
      case 4:
        return "#06d6a0";
      case 5:
        return "#e4c1f9";
    }
  };
  return (
    <div className="statIndicator">
      <span style={{ backgroundColor: getColor(props.ind), color: "#fff" }}>
        {props.name}
      </span>
      <span>{props.value}</span>
    </div>
  );
};
