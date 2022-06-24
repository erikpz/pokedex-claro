import React, { FC } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";

export const HomePage: FC = () => {
  return (
    <HomeLayout>
      <SearchBar />
      <div className="cardsContainer">
        <PokemonCard />
      </div>
    </HomeLayout>
  );
};
