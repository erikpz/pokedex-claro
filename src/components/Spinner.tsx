import React from "react";
import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "100px 0",
      }}
    >
      <CircularProgress size={50} />
      <p style={{ marginTop: 20, fontWeight: 800 }}>Cargando...</p>
    </div>
  );
};
