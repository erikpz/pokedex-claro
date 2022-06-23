import React, { FC } from "react";
import { HomeLayout } from "../components/HomeLayout";
import { SearchBar } from "../components/SearchBar";

export const HomePage: FC = () => {
  return (
    <HomeLayout>
      <SearchBar />
    </HomeLayout>
  );
};
