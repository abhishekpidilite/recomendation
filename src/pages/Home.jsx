import React, { useState, useRef, useEffect } from "react";

import Navbar1 from "./components/Navbar1";
import SearchBar from "../utils/components/SearchBar";
import { useRecommended } from "../api/recommended";
import ProductCard from "../utils/components/ProductCard";
import { CircularProgress } from "@mui/material";
import { useSearch } from "../api/search";
import SearchResultCard from "../utils/components/SearchResultCard";

// Sample product data with badges and categories

const Home = () => {
  const username = localStorage.getItem("username");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recommended, setRecommended] = useState([]);

  const {
    mutate: getRecommended,
    data: recommendedData,
    isPending: isRecommendedLoading,
  } = useRecommended();

  const {
    mutate: getSearch,
    data: searchData,
    isPending: isSearchLoading,
  } = useSearch();

  const handleSearch = (productName) => {
    console.log("productName", productName);
    getSearch({ productName });
  };

  const handleGetRecommended = () => {
    getRecommended({ username: username });
  };

  useEffect(() => {
    handleGetRecommended();
  }, []);

  //navbar
  return (
    <div className="p-4 bg-[#360133] flex flex-col min-h-screen w-screen">
      <Navbar1
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <div className="flex  justify-center items-center w-full py-10  ">
        <SearchBar handleSearch={handleSearch} />
      </div>

      {isSearchLoading && (
        <div className="flex justify-center items-center w-full pb-10">
          <CircularProgress className=" text-white" />
        </div>
      )}

      {searchData?.data?.products?.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold text-white">Search Results</p>
          </div>
          {
            <div className="w-full flex items-center justify-center overflow-x-auto gap-4">
              <SearchResultCard searchData={searchData.data.products} />
            </div>
          }
        </>
      )}

      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-white">Recommended Products</p>
      </div>

      <div className="w-full flex items-center justify-center overflow-x-auto gap-4">
        {isRecommendedLoading ? (
          <CircularProgress className="text-white" />
        ) : (
          <ProductCard recommendedData={recommendedData} />
        )}
      </div>
    </div>
  );

  //sidebar

  //main content

  //footer
};

export default Home;
