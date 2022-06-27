import React, { FC, useEffect, useState } from "react";
import { Dialog, Pagination } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { HomeLayout } from "../components/HomeLayout";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonDetail } from "../components/PokemonDetail";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { Transition } from "../components/Transition";
import { PokemonService } from "../services/PokemonService";

export const HomePage: FC = () => {
  const [pokemons, setpokemons] = useState<any>([]);
  const [pokemonsbytype, setpokemonsbytype] = useState<any>([]);
  const [openPokemonDetail, setopenPokemonDetail] = useState<boolean>(false);
  const [pokemonSelected, setpokemonSelected] = useState<any>();
  const [fetchingPoks, setfetchingPoks] = useState(false);
  const [countPoks, setcountPoks] = useState(0);
  const [page, setpage] = useState(0);
  const [countpage, setcountpage] = useState(20);
  const formMethods = useForm();

  const onSelectPokemon = (p: any) => {
    setopenPokemonDetail(true);
    setpokemonSelected(p);
  };

  const handleCloseModal = () => {
    setopenPokemonDetail(false);
    setpokemonSelected(null);
  };

  const getPokemons = async (pg?: number) => {
    setfetchingPoks(true);
    try {
      const pokemonService = PokemonService.getInstance();
      const response = await pokemonService.getAllPokemons(pg ?? 0, countpage);
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

  const getPokemonByIdOrName = async (idname: string | number) => {
    let response;
    setfetchingPoks(true);
    try {
      const pokemonService = PokemonService.getInstance();
      if (typeof idname === "string") {
        response = await pokemonService.getPokemonByName(idname);
      } else {
        response = await pokemonService.getPokemonById(idname);
      }
      console.log(response);
      if (response.status === 200) {
        setpokemons([response.data]);
        setpage(0);
        setcountPoks(1);
      } else {
        setpokemons([]);
        setpage(0);
        setcountPoks(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setfetchingPoks(false);
    }
  };

  const getPokemonType = async (type: string) => {
    setfetchingPoks(true);
    try {
      const pokemonService = PokemonService.getInstance();
      const response = await pokemonService.getPokemonType(type);
      console.log(response);
      const requestsPokemons = response.data.pokemon.map((poke: any) =>
        pokemonService.getPokemonByName(poke.pokemon.name)
      );
      const responsePokemons = await Promise.all(requestsPokemons);
      const pokems = responsePokemons.map((pokeDet: any) => pokeDet.data);
      setpokemonsbytype(pokems);
      setcountPoks(response.data.pokemon.length);
      setpage(0);
    } catch (error) {
      console.log(error);
    } finally {
      setfetchingPoks(false);
    }
  };

  const handleClearInput = () => {
    if (
      formMethods.getValues("search") ||
      formMethods.getValues("searchType")
    ) {
      formMethods.setValue("search", "");
      formMethods.setValue("searchType", "");
      setpage(0);
      getPokemons();
    }
  };

  const handlePagination = (e: any, p: number) => {
    if (formMethods.getValues("searchType")) {
      let pklist = pokemonsbytype.map((pk: any, i: number) => {
        if (i >= (p - 1) * countpage && i < (p - 1) * countpage + countpage) {
          return pk;
        }
        return null;
      });
      pklist = pklist.filter((p: any) => p);
      console.log(pklist);
      setpokemons(pklist);
    } else {
      getPokemons(p - 1);
    }
    setpage(p - 1);
  };

  useEffect(() => {
    getPokemons();
  }, []);
  /* console.log("pokemons", pokemons); */
  useEffect(() => {
    handlePagination(null, 1);
  }, [pokemonsbytype]);
  /* console.log("pokemons", pokemons); */
  return (
    <FormProvider {...formMethods}>
      <HomeLayout>
        <SearchBar
          handleFilter={getPokemonByIdOrName}
          handleClearInput={handleClearInput}
          getPokemonType={getPokemonType}
        />
        {fetchingPoks ? (
          <Spinner />
        ) : (
          <>
            <div className="cardsContainer">
              {pokemons.length > 0 ?
                pokemons.map((pokem: any) => (
                  <PokemonCard
                    pokemon={pokem}
                    key={pokem.id}
                    onSelect={onSelectPokemon}
                  />
                )): <p>No se encontraron resultados</p>}
            </div>
            {countPoks > 0 && (
              <Pagination
                count={Math.ceil(countPoks / 20)}
                page={page + 1}
                onChange={handlePagination}
                sx={{
                  my: 5,
                  "& .MuiPagination-ul": { justifyContent: "center" },
                }}
                color="primary"
              />
            )}
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
            <PokemonDetail
              pokemon={pokemonSelected}
              onClose={handleCloseModal}
              getPokemonType={getPokemonType}
            />
          </Dialog>
        )}
      </HomeLayout>
    </FormProvider>
  );
};
