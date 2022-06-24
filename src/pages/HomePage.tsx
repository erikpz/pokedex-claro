import React, { FC, useEffect, useState } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { PokemonService } from "../services/PokemonService";

export const HomePage: FC = () => {
  const [pokemons, setpokemons] = useState<any>([]);
  const getPokemons = async () => {
    try {
      const pokemonService = PokemonService.getInstance();
      const response = await pokemonService.getAllPokemons();
      const requestsPokemons = response.data.results.map((poke: any) =>
        pokemonService.getPokemonByName(poke.name)
      );
      const responsePokemons = await Promise.all(requestsPokemons);
      const pokems = responsePokemons.map((pokeDet: any) => pokeDet.data);
      setpokemons(pokems);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPokemons();
  }, []);
  console.log("pokemons", pokemons);
  return (
    <HomeLayout>
      <SearchBar />
      <div className="cardsContainer">
        {/* <PokemonCard pokemon={{}} /> */}
        {pokemons.length > 0 &&
          pokemons.map((pokem: any) => <PokemonCard pokemon={pokem} key={pokem.id}/>)}
      </div>
    </HomeLayout>
  );
};
