import React from "react";
import { Slide } from "@mui/material";

export const Transition = React.forwardRef(function Transition(
  props: any,
  ref: any
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
