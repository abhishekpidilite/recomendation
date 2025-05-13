import { TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MicIcon from "@mui/icons-material/Mic";

export default function SearchBar({ handleSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSeachOnEnter = (e) => {
    handleSearch(e.target.value);
  };

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchText(transcript);
      handleSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex items-center w-full my-2 h-full rounded-lg">
      <TextField
        className="w-full"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchOutlined sx={{ color: "gray", marginRight: "8px" }} />
          ),
          endAdornment: (
            <IconButton
              onClick={startVoiceRecognition}
              sx={{
                color: isListening ? "red" : "gray",
                "&:hover": { color: isListening ? "red" : "gray" },
              }}
            >
              <MicIcon />
            </IconButton>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "& input": {
              color: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSeachOnEnter(e);
          }
        }}
      />
    </div>
  );
}
