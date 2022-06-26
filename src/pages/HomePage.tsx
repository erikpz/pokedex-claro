import { Dialog, Pagination } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonDetail } from "../components/PokemonDetail";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { Transition } from "../components/Transition";
import { PokemonService } from "../services/PokemonService";

export const HomePage: FC = () => {
  const [pokemons, setpokemons] = useState<any>([]);
  const [openPokemonDetail, setopenPokemonDetail] = useState<boolean>(false);
  const [pokemonSelected, setpokemonSelected] = useState<any>();
  const [fetchingPoks, setfetchingPoks] = useState(false);
  const [countPoks, setcountPoks] = useState(0);
  const [page, setpage] = useState(0);

  const onSelectPokemon = (p: any) => {
    setopenPokemonDetail(true);
    setpokemonSelected(p);
  };
  const handleCloseModal = () => {
    setpokemonSelected(null);
    setopenPokemonDetail(false);
  };
  const getPokemons = async () => {
    setfetchingPoks(true);
    try {
      const pokemonService = PokemonService.getInstance();
      const response = await pokemonService.getAllPokemons(page);
      setcountPoks(response.data.count);
      const requestsPokemons = response.data.results.map((poke: any) =>
        pokemonService.getPokemonByName(poke.name)
      );
      const responsePokemons = await Promise.all(requestsPokemons);
      const pokems = responsePokemons.map((pokeDet: any) => pokeDet.data);
      setpokemons(pokems);
    } catch (error) {
      console.log(error);
    } finally {
      setfetchingPoks(false);
    }
  };
  useEffect(() => {
    getPokemons();
  }, [page]);
  /* console.log("pokemons", pokemons); */
  return (
    <HomeLayout>
      <SearchBar />
      {fetchingPoks ? (
        <Spinner />
      ) : (
        <>
          <div className="cardsContainer">
            {pokemons.length > 0 &&
              pokemons.map((pokem: any) => (
                <PokemonCard
                  pokemon={pokem}
                  key={pokem.id}
                  onSelect={onSelectPokemon}
                />
              ))}
          </div>
          <Pagination
            count={Math.ceil(countPoks / 20)}
            page={page + 1}
            onChange={(e: any, p: number) => setpage(p - 1)}
            sx={{ my: 5, "& .MuiPagination-ul": { justifyContent: "center" } }}
          />
        </>
      )}

      {pokemonSelected && (
        <Dialog
          maxWidth="md"
          open={openPokemonDetail}
          onClose={handleCloseModal}
          TransitionComponent={Transition}
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "transparent",
              boxShadow: "none",
            },
            "& .MuiDialog-paper": {
              overflowY: "visible",
            },
          }}
        >
          <PokemonDetail pokemon={pokemonSelected} onClose={handleCloseModal} />
        </Dialog>
      )}
    </HomeLayout>
  );
};
