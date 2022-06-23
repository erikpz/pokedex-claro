import React, { FC } from "react";
import { NavBar } from "./NavBar";

export const HomeLayout: FC<any> = (props) => {
  return (
    <div className="rootStyle">
      <NavBar />
      {props.children}
    </div>
  );
};
