import { ClassNames } from "@emotion/react";
import { TextField } from "@mui/material";
import React from "react";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center w-full bg-red-500  py-10">
      <div className="w-full">
        <TextField className="w-full" placeholder="Search" />
      </div>
    </div>
  );
}
