import React, { FC, useEffect, useState } from "react";
import "../styles/search-bar.scss";
import pokebola from "../assets/icons/pokebola.png";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select as Sl,
  styled,
  ListItemText,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { PokemonService } from "../services/PokemonService";
import { getTypeTranslate } from "../utils/helpers";

const Select = styled(Sl)(({ theme }) => ({
  width: "100%",
  maxWidth: 200,
  backgroundColor: "#fff",
  borderRadius: 12,
  "& .MuiSelect-select": {
    padding: "15px 16px",
  },
}));
const SelectOption = styled(ListItemText)(({ theme }) => ({
  margin: "2px 0",
  "& .MuiListItemText-primary": {
    fontSize: 14,
    margin: 0,
  },
}));

interface ISearchBarProps {
  handleFilter: (idname: string | number) => void;
  handleClearInput: () => void;
  getPokemonType: (type: any) => void;
}

export const SearchBar: FC<ISearchBarProps> = (props) => {
  const [types, settypes] = useState([]);
  const { register, handleSubmit, control } = useFormContext();

  const handleSearching = handleSubmit((data: any) => {
    if (isNaN(+data.search)) {
      props.handleFilter(data.search.toLowerCase());
    } else {
      props.handleFilter(+data.search);
    }
  });

  const getPokemonTypes = async () => {
    try {
      const pokemonService = PokemonService.getInstance();
      const response = await pokemonService.getPokemonTypes();
      settypes(response.data.results.map((r: any) => r.name));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (e: any) => {
    console.log(e.target);
    props.getPokemonType(e.target.value);
  };

  useEffect(() => {
    getPokemonTypes();
  }, []);

  return (
    <div>
      <div className="searchContainer">
        <input
          type="text"
          className="searchBar boxShadow"
          placeholder="Busca un pokémon"
          {...register("search", { required: true })}
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && e.shiftKey === false) {
              handleSearching();
            }
          }}
        />
        <img alt="" src={pokebola} />
      </div>
      <div className="btnContainer">
        {types.length > 0 && (
          <>
            <Controller
              name="searchType"
              defaultValue=""
              control={control}
              render={({ field: { ref, onChange, ...restFields } }: any) => (
                <FormControl sx={{ width: 300 }}>
                  <InputLabel sx={{ fontSize: 15 }}>Tipo</InputLabel>
                  <Select
                    inputRef={ref}
                    {...restFields}
                    onChange={(e) => {
                      onChange(e);
                      handleSelect(e);
                    }}
                    className="boxShadow"
                    label="Tipo"
                  >
                    <MenuItem disabled value="">
                      <SelectOption primary="Tipo" sx={{ fontSize: 14 }} />
                    </MenuItem>
                    {types.map((opt: string, i: number) => (
                      <MenuItem key={opt + i} value={opt}>
                        <SelectOption
                          primary={getTypeTranslate(opt)}
                          sx={{ fontSize: 14 }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Button
              variant="contained"
              onClick={props.handleClearInput}
              sx={{
                borderRadius: "12px",
                textTransform: "capitalize",
                padding: "15px 16px",
              }}
            >
              Limpiar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
