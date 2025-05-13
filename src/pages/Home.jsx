import React, { useState, useRef, useEffect } from "react";

import Navbar1 from "./components/Navbar1";
import SearchBar from "../utils/components/SearchBar";
import { useRecommended } from "../api/recommended";
import ProductCard from "../utils/components/ProductCard";
import { CircularProgress } from "@mui/material";
import { useSearch } from "../api/search";
import SearchResultCard from "../utils/components/SearchResultCard";
import CascadeLoader from "../utils/components/loader";

// Sample product data with badges and categories

const Home = () => {
  const username = localStorage.getItem("username");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const noResultText =
    "No relevant categories found for search term: sadfsafdsafdsafsadfsadf";

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
    <div className="p-4 bg-gray-100 flex flex-col min-h-screen w-screen">
      <Navbar1
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <div className="flex  justify-center items-center w-full py-5 pt-10  ">
        <SearchBar handleSearch={handleSearch} />
      </div>

      {isSearchLoading && (
        <div className="flex justify-center items-center w-full pb-10">
          <CascadeLoader />
        </div>
      )}

      {searchData?.data?.products?.length > 0 && (
        <>
          <div className="flex flex-col gap-4 pb-2">
            <p className="text-xl font-bold text-gray-600">Search Results</p>
          </div>
          {
            <div className="w-full flex items-center justify-center overflow-x-auto gap-4">
              <SearchResultCard searchData={searchData.data.products} />
            </div>
          }
        </>
      )}

      {searchData?.data?.suggestions[0]?.includes(
        "No relevant categories found"
      ) && (
        <div className="flex justify-center items-center w-full pb-10">
          <p className="text-xl font-bold text-gray-600">No products found</p>
        </div>
      )}

      {!searchData?.data?.products?.length > 0 && (
        <>
          <div className="flex flex-col gap-4 pb-2">
            <p className="text-xl font-bold text-gray-600">
              Recommended Products
            </p>
          </div>

          <div className="w-full flex items-center justify-center overflow-x-auto gap-4">
            {isRecommendedLoading ? (
              <CircularProgress className="text-white" />
            ) : (
              <ProductCard recommendedData={recommendedData} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
