import { TextField } from "@mui/material";
import React from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

export default function SearchBar() {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex items-center w-full  my-2 h-full rounded-lg">
      <TextField
        className="w-full"
        placeholder="Search"
        InputProps={{
          endAdornment: (
            <SearchOutlined
              sx={{ color: "white", cursor: "pointer" }}
              onClick={handleSearch}
            />
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "& input": {
              color: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
      />
    </div>
  );
}
